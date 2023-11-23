import { bookQuery } from "@/components/authorized/Main";
import connection from "@/lib/connection";
import books from "@/model/book";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

interface body {
  page: number;
  limit: number;
  query: bookQuery;
}

export async function POST(req: Request) {
  const { page, limit, query }: body = await req.json();

  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 404 });

  const skip = page * limit;

  const filter: any = {};

  if (query.filter.category.length > 0) filter.category = { $in: query.filter.category };
  if (query.filter.language.length > 0) filter.language = { $in: query.filter.language };
  if (query.filter.state.length > 0) filter.state = { $in: query.filter.state };

  await connection();

  const queryBooksCount = await books.count(filter);

  const publications = await books
    .aggregate([
      {
        $match: { ...filter, reservedBy: { $exists: false } },
      },
      {
        $lookup: {
          from: "users",
          let: {
            ownerID: "$owner",
          },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$ownerID"] },
              },
            },
            {
              $unset: ["email", "provider", "points", "_id", "date", "password", "contact"],
            },
          ],
          as: "ownerData",
        },
      },
      { $unwind: "$ownerData" },
      { $project: { _id: 0, id: "$_id", author: 1, title: 1, date: 1, image: 1, owner: 1, ownerData: 1 } },
    ])
    .sort({ date: query.sort })
    .skip(skip)
    .limit(limit);

  if (page == 0) {
    const reservedBooks = await books
      .aggregate([
        {
          $match: {
            $or: [
              { $and: [{ owner: new ObjectId(session.user?.id) }, { reservedBy: { $exists: true } }] },
              { reservedBy: new ObjectId(session.user?.id) },
            ],
          },
        },
        {
          $lookup: {
            from: "users",
            let: {
              ownerID: "$owner",
            },
            pipeline: [
              {
                $match: {
                  $expr: { $eq: ["$_id", "$$ownerID"] },
                },
              },
              {
                $unset: ["email", "provider", "points", "_id", "date", "password", "contact"],
              },
            ],
            as: "ownerData",
          },
        },
        {
          $addFields: {
            isReserved: true,
          },
        },
        { $unwind: "$ownerData" },
        {
          $project: {
            _id: 0,
            id: "$_id",
            author: 1,
            title: 1,
            date: 1,
            image: 1,
            owner: 1,
            ownerData: 1,
            isReserved: 1,
          },
        },
      ])
      .sort({ date: query.sort });

    return NextResponse.json({
      publications: [...reservedBooks, ...publications],
      queryBooksCount,
    });
  }

  return NextResponse.json({
    publications,
    queryBooksCount,
  });
}

import { bookQuery } from "@/components/authorized/Main";
import connection from "@/lib/connection";
import books from "@/model/book";
import { NextResponse } from "next/server";

interface body {
    page: number;
    limit: number;
    query: bookQuery;
}

export async function POST(req: Request) {
    const { page, limit, query }: body = await req.json();

    const skip = page * limit;

    const filter: any = {};

    if (query.filter.category.length > 0) filter.category = { $in: query.filter.category };
    if (query.filter.language.length > 0) filter.language = { $in: query.filter.language };
    if (query.filter.state.length > 0) filter.state = { $in: query.filter.state };

    await connection();

    const count = await books.count({});

    const publications = await books
        .aggregate([
            {
                $match: filter,
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
                            $unset: ["email", "provider", "points", "_id"],
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

    return NextResponse.json({ publications, count });
}

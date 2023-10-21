import { bookQuery } from "@/components/authorized/Main";
import connection from "@/lib/connection";
import books from "@/model/book";
import { ObjectId } from "mongodb";
import { Aggregate } from "mongoose";
import { NextResponse } from "next/server";

interface book {
    name: string;
    owner: string;
    author: string;
    description: string;
    date: string;
}

interface body {
    page: number;
    limit: number;
    query: bookQuery;
}

interface filter {
    category?: string[];
    language?: string[];
    state?: string[];
}

export async function POST(req: Request) {
    const { page, limit, query }: body = await req.json();

    const skip = page * limit;

    const filter: filter = {};

    if (query.filter.category.length > 0) filter.category = query.filter.category;
    if (query.filter.language.length > 0) filter.language = query.filter.language;
    if (query.filter.state.length > 0) filter.state = query.filter.state;

    await connection();

    const count = await books.count({});

    // const publications = await books
    //     .find(filter, { _id: 0, id: "$_id", author: 1, title: 1, date: 1, image: 1, owner: 1 })
    //     .sort({ date: query.sort })
    //     .skip(skip)
    //     .limit(limit);

    const publications = await books
        .aggregate([
            {
                $lookup: {
                    from: "users", // Имя коллекции с пользователями
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
            {$unwind: "$ownerData"},
            { $project: { _id: 0, id: "$_id", author: 1, title: 1, date: 1, image: 1, owner: 1, ownerData: 1 } },
        ])
        .sort({ date: query.sort })
        .skip(skip)
        .limit(limit);
    // const owner = await users.find({_id: {$in: publications}})
    console.log(publications);
    return NextResponse.json({ publications, count });
}

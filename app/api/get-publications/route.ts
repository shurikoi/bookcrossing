import { bookQuery } from "@/components/authorized/Main";
import connection from "@/lib/connection";
import books from "@/model/book";
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

    const publications: book[] = await books
        .find(filter, { _id: 0, id: "$_id", author: 1, title: 1, date: 1, image: 1 })
        .sort({ date: query.sort })
        .skip(skip)
        .limit(limit);

    return NextResponse.json({ publications, count });
}

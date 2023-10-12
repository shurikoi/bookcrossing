import { bookQuery } from "@/components/authorized/Main";
import { sort } from "@/components/contexts/FilterProvider";
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

// interface query {
//     category?: string[];
//     language?: string[];
//     state?: string[];
//     sort?: sort
// }

interface filter {
    category?: string[];
    language?: string[];
    state?: string[];
}

export async function POST(req: Request) {
    const { page, limit, query }: body = await req.json();

    const skip = page * limit;

    const filter: filter = {};

    if (query.filter.categories.length > 0) filter.category = query.filter.categories;
    if (query.filter.languages.length > 0) filter.language = query.filter.languages;
    if (query.filter.states.length > 0) filter.state = query.filter.states;

    const queryCount = await books.count(filter);
    const count = await books.count({});

    await connection();

    const publications: book[] = await books.find(filter).sort({ date: query.sort }).skip(skip).limit(limit);

    return NextResponse.json({ publications, queryCount, count });
}

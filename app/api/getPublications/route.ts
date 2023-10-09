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
    filter: {
        categories: string[] | null;
        languages: string[] | null;
        states: string[] | null;
    };
}

interface query {
    category?: string[];
    language?: string[];
    state?: string[];
}

export async function POST(req: Request) {
    const { page, limit, filter }: body = await req.json();

    const skip = page * limit;

    const query: query = {};

    if (filter.categories && filter.categories.length > 0) query.category = filter.categories;
    if (filter.languages && filter.languages.length > 0) query.language = filter.languages;
    if (filter.states && filter.states.length > 0) query.state = filter.states;

    const queryCount = await books.count(query);
    const count = await books.count({})

    await connection();

    const publications: book[] = await books.find(query).sort({ date: "desc" }).skip(skip).limit(limit);

    return NextResponse.json({ publications, queryCount, count });
}

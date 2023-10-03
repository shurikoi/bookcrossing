import connection from "@/lib/connection";
import books from "@/model/book";
import { NextResponse } from "next/server";

interface book {
    name: string;
    owner: string;
    author: string;
    description: string;
    date: string;
};

interface body {
    page: number;
    limit: number;
    filter: {
        categories: string[],
        languages: string[],
        states: string[]
    }
} 

export async function POST(req: Request) {
    const { page, limit, filter } : body = await req.json()

    const skip = page * limit

    await connection()

    const publications : book[] = await books.find({category: filter.categories}).sort({date: "desc"}).skip(skip).limit(limit);

    return NextResponse.json(publications);
}

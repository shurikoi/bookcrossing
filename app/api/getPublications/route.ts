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
} 

export async function POST(req: Request) {
    const { page, limit } : body = await req.json()

    const skip = page * limit

    await connection()

    const publications : book[] = await books.find({}).skip(skip).limit(limit);

    return NextResponse.json(publications);
}

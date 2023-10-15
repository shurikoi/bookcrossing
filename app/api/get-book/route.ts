import { bookData } from "@/components/authorized/Main";
import connection from "@/lib/connection";
import books from "@/model/book";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id }: { id: string } = await req.json();

    await connection();

    const book: bookData | null = await books.findOne({ _id: id }, { _id: 0 });

    return NextResponse.json(book);
}

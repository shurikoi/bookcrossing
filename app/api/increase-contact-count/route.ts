import connection from "@/lib/connection";
import books from "@/model/book";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { bookId }: { bookId: string } = await req.json();

    await connection();

    await books.updateOne({ _id: bookId }, { $inc: { shownContact: 1 } });

    return NextResponse.json({  }, { status: 200 });
}

import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const { id, ...updatedData } = await req.json();

    await connection();

    const session = await getServerSession(authOptions);

    const book = await books.findOne({ _id: id });
    
    if (book.owner.toString() == session?.user?.id) await books.updateOne({ _id: id }, updatedData);

    return NextResponse.json({}, { status: 200 });
}

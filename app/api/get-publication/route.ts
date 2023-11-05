import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const { id }: { id: string } = await req.json();

    await connection();

    const book = await books.findOne({ _id: id });
    const owner = await users.findOne({ _id: book?.owner }, { avatar: 1, name: 1, surname: 1 });

    if (!book) return NextResponse.json({}, { status: 404 });

    return NextResponse.json({ ...book?._doc, ownerData: owner?._doc });
}

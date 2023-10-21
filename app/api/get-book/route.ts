import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { id }: { id: string } = await req.json();

    await connection();

    const book = await books.findOne({ _id: id }, { _id: 0 });
    const owner = await users.findOne({ _id: book?.owner }, { avatar: 1, name: 1, surname: 1 });

    return NextResponse.json({ ...book._doc, ownerData: { ...owner._doc } });
}

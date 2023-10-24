import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const { id }: { id: string } = await req.json();

    await connection();

    const session = await getServerSession(authOptions);

    const book = await books.findOne({ _id: id }, { _id: 0 });
    const owner = await users.findOne({ _id: book?.owner }, { avatar: 1, name: 1, surname: 1 });
    console.log(book.reservedBy);
    if (book.reservedBy && session?.user?.id == book?.owner.toString()) {
        const reservator = await users.findOne({ _id: book.reservedBy }, { name: 1, surname: 1 });

        return NextResponse.json({ ...book._doc, ownerData: owner._doc, reservatorData: reservator._doc });
    }

    return NextResponse.json({ ...book._doc, ownerData: owner._doc });
}

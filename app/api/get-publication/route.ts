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

    // if (book?.reservedBy) {
    //     if (session?.user?.id == book?.owner.toString()) {
    //         const reservator = await users.findOne({ _id: book.reservedBy }, { name: 1, surname: 1 });

    //         return NextResponse.json({ ...book?._doc, ownerData: owner?._doc, reservation: {
    //             reservedBy: book.reservedBy,
    //             reservatorData: reservator?._doc
    //         } });
    //     }
    //     // } else if (book?.reservedBy.toString() == session?.user?.id) {
    //     //     return NextResponse.json({ ...book?._doc, ownerData: owner?._doc, amIReservator: true});
    //     // }
    // }

    return NextResponse.json({ ...book?._doc, ownerData: owner?._doc });
}

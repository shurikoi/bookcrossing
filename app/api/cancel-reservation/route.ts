import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
    const { id }: { id: string; contact: string } = await req.json();

    try {
        await connection();

        const session = await getServerSession(authOptions);
        const user = await users.findOne({ _id: session?.user?.id });
        console.log(user);
        if (session && user)
            await books.updateOne(
                { _id: id, reservedBy: user._id },
                { $unset: { reservedBy: "", reservatorContact: "" } }
            );
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }

    return NextResponse.json({}, { status: 200 });
}

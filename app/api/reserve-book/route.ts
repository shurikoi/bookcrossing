import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const { id, contact }: { id: string; contact: string } = await req.json();

    try {
        await connection();

        const session = await getServerSession(authOptions);
        const user = await users.findOne({ _id: session?.user?.id });

        if (session && user) {
            await books.updateOne({ _id: id }, { reservedBy: user.id, contact });
        } else throw new Error("Coś poszło nie tak");
    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }

    return NextResponse.json({}, { status: 200 });
}

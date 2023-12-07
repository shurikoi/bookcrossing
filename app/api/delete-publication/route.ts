import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import fs from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const { id }: { id: string } = await req.json();

    await connection();

    const session = await getServerSession(authOptions);
    const user = await users.findOne({ _id: session?.user?.id });

    if (!session || !user) return NextResponse.json({}, { status: 404 });

    if (session.user?.id == user.id.toString()) {
        const { image } = await books.findOneAndDelete({ _id: id });

        try {
            await fs.unlink("./assets" + image);
        } catch (error) {}
    } else return NextResponse.json({}, { status: 404 });

    return NextResponse.json({}, { status: 200 });
}

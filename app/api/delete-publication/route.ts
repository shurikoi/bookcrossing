import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import fs from "fs";

export async function POST(req: Request) {
    const { id }: { id: string } = await req.json();

    await connection();

    const session = await getServerSession(authOptions);
    const user = await users.findOne({ _id: session?.user?.id });

    if (!session || !user) return NextResponse.json({}, { status: 404 });

    const { image } = await books.findOneAndDelete({ _id: id });

    fs.unlinkSync("./public" + image);

    return NextResponse.json({}, { status: 200 });
}

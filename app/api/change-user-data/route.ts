import connection from "@/lib/connection";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

interface body {
    email: string;
    name: string;
    surname: string;
}

export async function POST(req: Request) {
    await connection();

    const { email, name, surname }: body = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) return NextResponse.json({}, { status: 404 });

    await users.updateOne({ email: session.user?.email }, { email, name, surname });

    return NextResponse.json({}, { status: 200 });
}

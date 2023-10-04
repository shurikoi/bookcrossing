import connection from "@/lib/connection";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

interface userData {
    email: string;
    name: string;
    surname: string;
}

export async function POST(req: Request) {
    await connection();

    const { email, name, surname }: userData = await req.json();

    const { user } = (await getServerSession(authOptions)) as { user: { email: string } };

    await users.updateOne({ email: user.email }, { email, name, surname });

    return NextResponse.json({}, { status: 200 });
}

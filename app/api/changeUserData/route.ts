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
    const { email, name, surname } = (await req.json()) as userData;
    await connection();

    const { user } = (await getServerSession(authOptions)) as { user: { id: string; email: string } };
    const { id } = user;
    const updateduser = await users.updateOne({ _id: id }, { email, name, surname });
    return NextResponse.json({}, { status: 200 });
}

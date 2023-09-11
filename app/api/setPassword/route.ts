import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import users from "@/model/user";
import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import hashPassword from "@/lib/hashPassword";

export async function POST(req: Request) {
    await connection()

    const { newPassword } = await req.json();

    const { user } = (await getServerSession(authOptions)) as { user: { email: string } };
    console.log(user)
    await users.updateOne({ email: user.email }, { password: hashPassword(newPassword) });

    return NextResponse.json({}, { status: 200 });
}

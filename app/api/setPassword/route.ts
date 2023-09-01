import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import users from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { newPassword } = await req.json();

    const { user } = (await getServerSession(authOptions)) as { user: { email: string } };
    console.log(user)
    await users.updateOne({ email: user.email }, { password: newPassword });

    return NextResponse.json({}, { status: 200 });
}

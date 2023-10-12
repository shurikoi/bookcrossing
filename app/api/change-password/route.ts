import users from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import hashPassword from "@/lib/hashPassword";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const newPassword = await req.text();
    const { user } = (await getServerSession(authOptions)) as { user: { email: string } };

    const { password: currentPassword } = await users.findOne({ email: user.email });

    if (currentPassword == hashPassword(newPassword))
        users.updateOne({ email: user.email }, { password: hashPassword(newPassword) });

    return NextResponse.json({}, { status: 200 });
}

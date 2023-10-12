import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import users from "@/model/user";
import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import hashPassword from "@/lib/hashPassword";
import { validatePassword } from "@/lib/isUserDataValid";

interface body {
    password: string;
}

export async function POST(req: Request) {
    await connection();

    const { password }: body = await req.json();

    const isPasswordValid = validatePassword(password);

    if (!isPasswordValid.isValid)
        return NextResponse.json(
            {
                isValid: false,
            },
            { status: 400 }
        );

    const { user } = (await getServerSession(authOptions)) as { user: { email: string } };

    const hashedPassword = await hashPassword(password);

    await users.updateOne({ email: user.email }, { password: hashedPassword });

    return NextResponse.json({}, { status: 200 });
}

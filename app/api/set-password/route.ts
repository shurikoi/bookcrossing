import connection from "@/lib/connection";
import hashPassword from "@/lib/hashPassword";
import { validatePassword } from "@/lib/isUserDataValid";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

interface body {
    password?: string;
    newPassword?: string;
    currentPassword?: string;
}

export async function POST(req: Request) {
    await connection();

    const { newPassword, currentPassword, password }: body = await req.json();

    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({}, { status: 400 });

    if (password) {
        const isPasswordValid = validatePassword(password);

        if (!isPasswordValid.isValid)
            return NextResponse.json(
                {
                    isValid: false,
                },
                { status: 400 }
            );

        const hashedPassword = await hashPassword(password);

        await users.updateOne({ _id: session?.user?.id }, { password: hashedPassword });

        return NextResponse.json({ isValid: true }, { status: 200 });
    }

    if (newPassword && currentPassword) {
        const user = await users.findOne({ _id: session?.user?.id }, { password: 1 });
        
        if (user.password != (await hashPassword(currentPassword)))
            return NextResponse.json({ isValid: false }, { status: 400 });

        const isNewPasswordValid = validatePassword(newPassword);
        
        if (!isNewPasswordValid.isValid) return NextResponse.json({ isValid: false }, { status: 400 });

        const hashedPassword = await hashPassword(newPassword);

        await users.updateOne({ _id: session?.user?.id }, { password: hashedPassword });

        return NextResponse.json({ isValid: true }, { status: 200 });
    }
}

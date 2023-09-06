import connection from "@/lib/connection";
import users from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connection()

    const data: { email: string; password: string } = await req.json();

    const email: string = data.email;
    const password: string = data.password;

    const user = await users.findOne({ email, password });
    if (user)
        return NextResponse.json({
            isValid: true,
        });

    return NextResponse.json({
        isValid: false,
    });
}

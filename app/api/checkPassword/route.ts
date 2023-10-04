import connection from "@/lib/connection";
import hashPassword from "@/lib/hashPassword";
import users from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connection();

    const body: { email: string; password: string } = await req.json();

    const email: string = body.email;
    const password: string = await hashPassword(body.password);

    const user = await users.findOne({ email, password });

    if (user)
        return NextResponse.json({
            isValid: true,
        });

    return NextResponse.json({
        isValid: false,
    });
}

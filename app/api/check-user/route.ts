import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import users from "@/model/user";

export async function POST(req: Request) {
    await connection();

    const body: { email: string } = await req.json();

    const email = body.email;

    const user = await users.findOne({ email });

    if (user)
        return NextResponse.json({
            isExist: true,
        });

    return NextResponse.json({
        isExist: false,
    });
}

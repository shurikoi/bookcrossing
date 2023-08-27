import connection from "@/lib/connection";
import users from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = (await req.json()) as { email: string };
    
    const { email } = body;

    await connection()

    const { name, surname, points, password } = await users.findOne({ email });

    return NextResponse.json({ name, surname, email, points, isPasswordExist: !!password });
}

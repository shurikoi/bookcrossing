import connection from "@/lib/connection";
import users from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connection();

    const body: { email: string } = await req.json();

    const { email } = body;

    const { _id: id, name, surname, points, password, avatar } = await users.findOne({ email });

    return NextResponse.json({ id, name, surname, email, avatar, points, isPasswordExist: !!password });
}

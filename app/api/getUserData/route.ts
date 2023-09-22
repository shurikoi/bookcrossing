import connection from "@/lib/connection";
import users from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connection()
    
    const body = (await req.json()) as { email: string };
    
    const { email } = body;

    const { _id: id, name, surname, points, password } = await users.findOne({ email });
    console.log(users, users.find({}))
    return NextResponse.json({ id, name, surname, email, points, isPasswordExist: !!password });
}

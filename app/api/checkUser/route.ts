import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import users from "@/model/user";

export async function POST(req: Request) {
    const data = await req.json();

    const email: string = data.email;

    const user = await users.findOne({ email });

    if (user)
        return NextResponse.json({
            isExist: true,
        });

    return NextResponse.json({
        isExist: false,
    });
}

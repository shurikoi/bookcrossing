import users from "@/model/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = (await req.json()) as { id: string };

    const { id } = body;

    const { name, surname, email, points } = await users.findOne({ _id: id });

    return NextResponse.json({ name, surname, email, points });
}

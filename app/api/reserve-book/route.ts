import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

interface body {
    id: string;
    contact: string;
    messenger: string;
    addToProfile: boolean;
}

export async function POST(req: Request) {
    const { id, contact, addToProfile, messenger }: body = await req.json();

    await connection();

    const session = await getServerSession(authOptions);
    const user = await users.findOne({ _id: session?.user?.id });

    const book = await books.findOne({ _id: id, reservedBy: { $exists: true } });
    if (!book) return NextResponse.json({}, { status: 404 });

    if (!session || !user) return NextResponse.json({}, { status: 404 });

    if (addToProfile) await users.updateOne({ _id: user.id }, { contact: { ...user.contact, [messenger]: contact } });

    await books.updateOne({ _id: id }, { reservedBy: user.id, reservatorContact: contact });

    return NextResponse.json({}, { status: 200 });
}

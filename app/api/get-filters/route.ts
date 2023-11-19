import connection from "@/lib/connection";
import books from "@/model/book";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    await connection();

    const categories = await books.find({reservedBy: {$exists: false}}).distinct("category");
    const languages = await books.find({reservedBy: {$exists: false}}).distinct("language");
    const states = await books.find({reservedBy: {$exists: false}}).distinct("state");

    return NextResponse.json({ categories, languages, states });
}

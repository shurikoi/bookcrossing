import connection from "@/lib/connection";
import books from "@/model/book";
import { NextResponse } from "next/server";

type book = {
    name: string;
    owner: string;
    author: string;
    description: string;
    date: string;
};

export async function POST() {

    const publications : book[] = await books.find({});

    return NextResponse.json(publications);
}

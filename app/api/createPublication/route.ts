import { NextResponse } from "next/server";
import fs from "fs";
import books from "@/model/book";
import connection from "@/lib/connection";
import isDataValid from "@/lib/isDataValid";

export async function POST(req: Request) {
    await connection()

    const body = await req.formData();

    const data: any = {};

    for (const [key, value] of body) {
        data[key] = value;
    }
    const errors = isDataValid(data);

    if (errors.hasErrors) return NextResponse.json(errors);

    const parts = data.imageName.split(".");

    const image = {
        name: parts.slice(0, -1).join(""),
        extension: parts.slice(-1)
    };

    const buffer = Buffer.from(await data.image!.arrayBuffer());

    const date = new Date().getTime();

    const path = `/books/${date}_${image.name}.${image.extension}`;

    fs.writeFile("./public" + path, buffer, () => {});

    const { title, owner, description, category, author, messenger, messengerDescription } = data;

    books.create({
        title,
        owner,
        description,
        category,
        author,
        messenger,
        messengerDescription,
        image: path,
        date: date,
    });

    return NextResponse.json({});
}

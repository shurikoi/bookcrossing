import { NextResponse } from "next/server";
import fs from "fs";
import books from "@/model/book";

export async function POST(req: Request) {
    const body = await req.formData();

    const data: any = {};

    for (const [key, value] of body) {
        data[key] = value;
    }

    const img = data.image;

    const name = data.imageName;

    const parts = name.split(".");

    const imgName = parts.slice(0, -1).join("");
    const imgExtension = parts.slice(-1);

    const buffer = Buffer.from(await img.arrayBuffer());
    const date = new Date().getTime()
    const imagePath = `/books/${date}_${imgName}.${imgExtension}`;

    fs.writeFile("./public" + imagePath, buffer, () => {});

    const { title, owner, description, category, author } = data;

    books.create({
        title,
        owner,
        description,
        category,
        author,
        image: imagePath,
        date: date,
    });

    console.log(body);

    return NextResponse.json({});
}

import { NextResponse } from "next/server";
import fs from "fs";
import books from "@/model/book";
import isDataValid from "@/lib/isDataValid";

export async function POST(req: Request) {
    const body = await req.formData();

    const data: any = {};

    for (const [key, value] of body) {
        data[key] = value;
    }
    const errors = isDataValid(data);

    if (errors.hasErrors) return NextResponse.json(errors);
    console.log(data.image)
    const parts = data.imageName.split(".");

    const imageName = parts.slice(0, -1).join("");
    const imageExtension = parts.slice(-1);

    const buffer = Buffer.from(await data.image!.arrayBuffer());

    const date = new Date().getTime();

    const imagePath = `/books/${date}_${imageName}.${imageExtension}`;

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

    return NextResponse.json({});
}

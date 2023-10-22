import { NextResponse } from "next/server";
import fs from "fs";
import books from "@/model/book";
import connection from "@/lib/connection";
import isPublicationDataValid from "@/lib/isPublicationDataValid";
import { publicationData } from "@/components/authorized/PublicationMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import users from "@/model/user";

export async function POST(req: Request) {
    const body: publicationData = await req.json();

    const { hasErrors } = isPublicationDataValid(body);

    if (hasErrors) return NextResponse.json("publication data isn't valid", { status: 400 });

    const session = await getServerSession(authOptions);

    const user = await users.findOne({ _id: session?.user?.id });

    if (session && user && user.points > 0) {
        await connection();

        const path = "/books/" + body.imageName;

        const image = Buffer.from(body.imageData.split(",")[1], "base64")

        fs.writeFile("./public" + path, image, () => {});

        users.updateOne({ _id: user._id }, { points: user.points - 1 });

        books.create({
            title: body.title,
            owner: session?.user?.id,
            description: body.description,
            category: body.category,
            author: body.author,
            language: body.language,
            state: body.state,
            messenger: body.messenger,
            messengerDescription: body.messengerDescription,
            image: path,
            date: new Date(),
        });
    } else return NextResponse.json({}, { status: 400 });

    return NextResponse.json({});
    // const body = await req.formData();

    // const data: any = {};

    // for (const [key, value] of body) {
    //     data[key] = value;
    // }
    // const errors = isPublicationDataValid(data);

    // if (errors.hasErrors) return NextResponse.json(errors);

    // const parts = data.imageName.split(".");

    // const image = {
    //     name: parts.slice(0, -1).join(""),
    //     extension: parts.slice(-1)
    // };

    // const buffer = Buffer.from(await data.image!.arrayBuffer());

    // const date = new Date().getTime();

    // const path = `/books/${date}_${image.name}.${image.extension}`;

    // fs.writeFile("./public" + path, buffer, () => {});

    // const { title, owner, description, category, author, messenger, messengerDescription } = data;

    // books.create({
    //     title,
    //     owner,
    //     description,
    //     category,
    //     author,
    //     messenger,
    //     messengerDescription,
    //     image: path,
    //     date: date,
    // });

    // return NextResponse.json({});
}

import { NextResponse } from "next/server";
import fs from "fs";
import books from "@/model/book";
import connection from "@/lib/connection";
import isPublicationDataValid from "@/lib/isPublicationDataValid";
import { publicationData } from "@/components/authorized/publication_menu/PublicationMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import users from "@/model/user";
import generateRandomString from "@/lib/generateRandomName";

export async function POST(req: Request) {
    const body: publicationData = await req.json();

    const { hasErrors } = isPublicationDataValid(body);

    if (hasErrors) return NextResponse.json("Dane nie są prawidłowe", { status: 400 });

    const session = await getServerSession(authOptions);

    const user = await users.findOne({ _id: session?.user?.id });

    if (session && user) {
        await connection();

        const extension = body.imageName.split(".").at(-1);

        const path = "/books/" + generateRandomString(30) + "." + extension;

        try {
            const image = Buffer.from(body.imageData.split(",")[1], "base64");

            fs.writeFile("./public" + path, image, () => {});

            // await users.updateOne({ _id: user._id }, { points: user.points - 1 });
        } catch (error) {
            return NextResponse.json("Coś poszło nie tak", { status: 400 });
        }

        const book = await books.create({
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
            date: body.date,
        });
        console.log(book);
        return NextResponse.json({ id: book._id });
    } else return NextResponse.json({}, { status: 400 });
}

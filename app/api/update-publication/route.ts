import connection from "@/lib/connection";
import books from "@/model/book";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import fs from "fs";
import getExtension from "@/lib/getExtension";
import generateRandomString from "@/lib/generateRandomString";
import resizeImage from "@/lib/resizeImage";

export async function POST(req: Request) {
    const { id, ...updatedData } = await req.json();

    await connection();

    const session = await getServerSession(authOptions);

    const book = await books.findOne({ _id: id });

    if (book.owner.toString() == session?.user?.id) {
        if (updatedData.image) {
            const extension = getExtension(updatedData.image, true);

            const randomName = "/books/" + generateRandomString() + "." + extension;

            const imageBuffer = Buffer.from(updatedData.image.split(",")[1], "base64");

            const resizedImage = await resizeImage(imageBuffer);

            fs.writeFile("./public" + randomName, resizedImage, () => {});

            await books.findOneAndUpdate({ _id: id }, { ...updatedData, image: randomName });

            try {
                fs.unlinkSync("./public" + book.image);
            } catch (error) {}
        } else {
            await books.findOneAndUpdate({ _id: id }, updatedData);
        }
    }

    return NextResponse.json({}, { status: 200 });
}

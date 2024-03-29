import connection from "@/lib/connection";
import generateRandomString from "@/lib/generateRandomString";
import getExtension from "@/lib/getExtension";
import resizeImage from "@/lib/resizeImage";
import books from "@/model/book";
import fs from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const { id, title, author, description, image, category, language, state, messenger, messengerDescription } =
    await req.json();

  await connection();

  const session = await getServerSession(authOptions);

  const book = await books.findOne({ _id: id });

  if (book.owner.toString() == session?.user?.id) {
    if (image) {
      const extension = getExtension(image, true);

      const randomName = "/books/" + generateRandomString() + "." + extension;

      const imageBuffer = Buffer.from(image.split(",")[1], "base64");

      if (imageBuffer.byteLength / 1024 / 1024 > 1) return NextResponse.json("Coś poszło nie tak", { status: 400 });
      else await fs.writeFile("./assets" + randomName, imageBuffer);

      await books.findOneAndUpdate(
        { _id: id },
        {
          title,
          author,
          description,
          category,
          state,
          language,
          messenger,
          messengerDescription,
          image: "/api" + randomName,
        }
      );

      try {
        await fs.unlink("./assets" + book.image.slice(4));
      } catch (error) {}
    } else {
      await books.findOneAndUpdate(
        { _id: id },
        { title, author, description, category, state, language, messenger, messengerDescription }
      );
    }
  }

  return NextResponse.json({}, { status: 200 });
}

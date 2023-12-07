import { publicationData } from "@/components/authorized/publication_menu/PublicationMenu";
import connection from "@/lib/connection";
import generateRandomString from "@/lib/generateRandomString";
import getExtension from "@/lib/getExtension";
import isPublicationDataValid from "@/lib/isPublicationDataValid";
import resizeImage from "@/lib/resizeImage";
import books from "@/model/book";
import users from "@/model/user";
import fs from "fs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const body: publicationData = await req.json();

  const { hasErrors } = isPublicationDataValid(body);

  if (hasErrors) return NextResponse.json("Dane nie są prawidłowe", { status: 400 });

  const session = await getServerSession(authOptions);

  const user = await users.findOne({ _id: session?.user?.id });

  if (session && user) {
    await connection();

    const extension = getExtension(body.image, true);

    const path = "/books/" + generateRandomString(30) + "." + extension;

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: JSON.stringify({
          path,
          image: body.image,
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(response)
      // const imageBuffer = Buffer.from(body.image.split(",")[1], "base64");

      // const resizedImage = await resizeImage(imageBuffer)

      // fs.writeFile("./public" + path, resizedImage, () => {});
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

    return NextResponse.json({ id: book._id });
  } else return NextResponse.json({}, { status: 400 });
}

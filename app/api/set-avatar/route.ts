import connection from "@/lib/connection";
import generateRandomString from "@/lib/generateRandomString";
import getExtension from "@/lib/getExtension";
import resizeImage from "@/lib/resizeImage";
import { allowedImageTypes } from "@/lib/variables";
import users from "@/model/user";
import fs from "fs/promises";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const { avatar }: { avatar: string } = await req.json();

  await connection();

  const session = await getServerSession(authOptions);
  const user = await users.findOne({ _id: session?.user?.id });

  const extension = getExtension(avatar, true);

  if (!session || !user || (extension && !allowedImageTypes.includes(extension.toLowerCase())))
    return NextResponse.json({}, { status: 404 });

  const randomName = generateRandomString() + "." + extension;
  const imageBuffer = Buffer.from(avatar.split(",")[1], "base64");

  const path = "/avatars/" + randomName;

  try {
    if (user.avatar != "/api/avatars/01.png") await fs.unlink("./assets" + user.avatar.slice(4));
  } catch (error) {}

  if (imageBuffer.byteLength / 1024 / 1024 > 1) return NextResponse.json("Coś poszło nie tak", { status: 400 });
  else await fs.writeFile("./assets" + path, imageBuffer);

  await users.updateOne({ _id: user.id }, { avatar: "/api" + path });

  return NextResponse.json({ path: "/api" + path }, { status: 200 });
}

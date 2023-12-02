import connection from "@/lib/connection";
import generateRandomString from "@/lib/generateRandomString";
import getExtension from "@/lib/getExtension";
import resizeImage from "@/lib/resizeImage";
import { allowedImageTypes } from "@/lib/variables";
import users from "@/model/user";
import fs from "fs";
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

  const resizedImage = await resizeImage(imageBuffer, 200, 200);

  const path = "/avatars/" + randomName;

  try {
    if (user.avatar != "/avatars/01.png") fs.unlinkSync("./public" + user.avatar);
  } catch (error) {}

  fs.writeFile("./public" + path, resizedImage, () => {});

  await users.updateOne({ _id: user.id }, { avatar: path });

  return NextResponse.json({ path }, { status: 200 });
}

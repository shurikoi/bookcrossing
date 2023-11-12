import connection from "@/lib/connection";
import users from "@/model/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import generateRandomString from "@/lib/generateRandomString";
import fs from "fs";
import getExtension from "@/lib/getExtension";
import { allowedImageTypes } from "@/lib/variables";

export async function POST(req: Request) {
    const { avatar }: { avatar: string } = await req.json();

    await connection();

    const session = await getServerSession(authOptions);
    const user = await users.findOne({ _id: session?.user?.id });
    
    const extension = getExtension(avatar, true); // type between / and ;

    if (!session || !user || (extension && !allowedImageTypes.includes(extension))) return NextResponse.json({}, { status: 404 });

    const randomName = generateRandomString() + "." + extension;
    const buffer = Buffer.from(avatar.split(",")[1], "base64");
    const path = "/avatars/" + randomName;

    fs.unlink("./public" + user.avatar, () => {});
    fs.writeFile("./public" + path, buffer, () => {});

    await users.updateOne({ _id: user.id }, { avatar: path });

    return NextResponse.json({ path }, { status: 200 });
}

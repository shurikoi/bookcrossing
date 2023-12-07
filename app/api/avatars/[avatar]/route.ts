import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request, context: { params: { avatar: string | undefined } }) {
  const { avatar } = context.params;

  const filePath = path.resolve(".", "assets/avatars/" + avatar);

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(file);
  } catch (error) {
    return new NextResponse(null, {status: 404})
  }
}

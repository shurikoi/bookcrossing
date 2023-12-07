import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request, context: { params: { book: string | undefined } }) {
  const { book } = context.params;

  const filePath = path.resolve(".", "assets/books/" + book);

  // let file: Buffer;

  try {
    const file = await fs.readFile(filePath);

    return new NextResponse(file);
  } catch (error) {
    return new NextResponse(null, {status: 404})
  }

}

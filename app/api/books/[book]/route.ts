import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET(req: Request, context: { params: { book: string | undefined } }) {
  const { book } = context.params;

  const filePath = path.resolve(".", "assets/books/" + book);

  try {
    const file = await fs.readFile(filePath);

    const headers = new Headers(req.headers);

    headers.set("Cache-Control", "max-age=300");

    return new NextResponse(file, { headers });
  } catch (error) {
    return new NextResponse(null, { status: 404 });
  }
}

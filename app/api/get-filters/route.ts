import connection from "@/lib/connection";
import books from "@/model/book";
import { NextResponse } from "next/server";
import { getUserSession } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  await connection();

  const session = getUserSession();

  const categories = await books.find({ reservedBy: { $exists: false } }).distinct("category");
  const languages = await books.find({ reservedBy: { $exists: false } }).distinct("language");
  const states = await books.find({ reservedBy: { $exists: false } }).distinct("state");

  return NextResponse.json({ categories, languages, states });
}

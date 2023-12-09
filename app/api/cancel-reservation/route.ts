import connection from "@/lib/connection";
import books from "@/model/book";
import users from "@/model/user";
import { NextResponse } from "next/server";
import { getUserSession } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const { id }: { id: string } = await req.json();

  try {
    await connection();

    const session = await getUserSession();
    const user = await users.findOne({ _id: session?.user?.id });

    if (!session || !user) return NextResponse.json({}, { status: 404 });
    
    await books.updateOne({ _id: id, reservedBy: user._id }, { $unset: { reservedBy: "", reservatorContact: "" } });
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }

  return NextResponse.json({}, { status: 200 });
}

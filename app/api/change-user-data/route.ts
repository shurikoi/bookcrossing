import connection from "@/lib/connection";
import users from "@/model/user";
import { NextResponse } from "next/server";
import { getUserSession } from "../auth/[...nextauth]/route";

interface body {
  login: string;
}

export async function POST(req: Request) {
  await connection();

  const { login }: body = await req.json();

  const session = await getUserSession();

  if (!session) return NextResponse.json({}, { status: 404 });

  await users.updateOne({ login: session.user?.login }, { login });

  return NextResponse.json({}, { status: 200 });
}

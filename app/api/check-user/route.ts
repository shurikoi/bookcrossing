import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import users from "@/model/user";
import hashPassword from "@/lib/hashPassword";

export async function POST(req: Request) {
  const { login, password } = await req.json();

  await connection();

  const userData = {
    isValid: false,
    isExist: false,
  };

  const user = await users.findOne({ login });
  if (user) {
    userData.isExist = true;

    const hashedPassword = await hashPassword(password);
    console.log(password, hashedPassword, user.password)
    if (hashedPassword == user.password) {
      userData.isValid = true;
    }
  }

  return NextResponse.json(userData);
}

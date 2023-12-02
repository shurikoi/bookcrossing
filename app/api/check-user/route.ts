import connection from "@/lib/connection";
import hashPassword from "@/lib/hashPassword";
import users from "@/model/user";
import { NextResponse } from "next/server";

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
    
    if (hashedPassword == user.password) {
      userData.isValid = true;
    }
  }

  return NextResponse.json(userData);
}

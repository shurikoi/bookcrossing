"use client";
import { getSession, signIn } from "next-auth/react";
import { useEffect } from "react";
// import { useEffect } from "react";

export default function GoogleSignin() {
  async function checkSession() {
    const session = await getSession();

    if (!session) signIn("google");
    else window.close();
  }

  useEffect(() => {
    checkSession();
  }, []);

  return <></>;
}

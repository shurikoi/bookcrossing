"use client";

import AuthorizedStartPage from "@/components/authorized/StartPage";
import UnauthorizedStartPage from "@/components/unauthorized/StartPage";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) return <AuthorizedStartPage></AuthorizedStartPage>;

  return <UnauthorizedStartPage></UnauthorizedStartPage>;
}

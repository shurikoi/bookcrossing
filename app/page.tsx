"use client";

import AuthorizedStartPage from "@/components/authorized/StartPage";
import UnauthorizedStartPage from "@/components/unauthorized/StartPage";
import { useSession } from "next-auth/react";

export default function Home({
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { data: session } = useSession();

  if (session) return <AuthorizedStartPage searchParams={searchParams}></AuthorizedStartPage>;

  return <UnauthorizedStartPage></UnauthorizedStartPage>;
}

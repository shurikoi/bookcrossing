"use client"

import { SessionProvider as Session, SessionProviderProps } from "next-auth/react";
import { UserProvider } from "./UserProvider";

export default function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <>
      <Session session={session}>
        <UserProvider>{children}</UserProvider>
      </Session>
    </>
  );
}

import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { UserProvider } from "./UserProviders";

export default function Session({ children, session }: SessionProviderProps) {
    return (
        <>
            <SessionProvider session={session}>
                <UserProvider>{children}</UserProvider>
            </SessionProvider>
        </>
    );
}

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export default function Session({ children, session }: SessionProviderProps) {
    return (
        <>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
        </>
    );
}

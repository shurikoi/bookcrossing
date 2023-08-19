import connection from "@/lib/connection";
import users from "@/model/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signOut } from "next-auth/react";

type credentials = {
    authType: "signin" | "signup";
    name?: string;
    surname?: string;
    email: string;
    password: string;
};

type user = {
    _id: string;
    name: string;
    surname: string;
    email: string;
    points: number;
};

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { authType, email, password } = credentials as credentials;

                await connection();

                const user = await users.findOne({ email });

                if (authType == "signin") {
                    if (user && user.password == password) {
                        const id = user._id.toString();

                        return { id, email } as any;
                    }
                } else if (authType == "signup") {
                    if (!user) {
                        const { name, surname } = credentials as credentials;

                        const user = await users.create({ name, surname, password, email, points: 0 });

                        const id = user._id.toString();

                        return { id, email } as any;
                    }
                }
            },
        }),
        GoogleProvider({
            clientSecret: process.env.GOOGLE_SECRET as string,
            clientId: process.env.GOOGLE_CLIENT_ID as string,
        }),
    ],
    pages: {
        signIn: "/",
        signOut: "/",
    },
    callbacks: {
        async session({ session }) {
            console.log(session)
            const email: string = session?.user?.email as string;

            await connection();

            const user = (await users.findOne({ email })) as user;

            if (user) session.user = { id: user._id, email: session.user.email };
            // console.log("session", session, user)

            // const id: string = session.user.id as string;

            // session.user = { id };

            return session;
        },
        async signIn({ profile, account }) {
            if (account?.provider == "google") {
                const {
                    email,
                    given_name: name,
                    family_name: surname,
                } = profile as {
                    given_name: string;
                    family_name: string;
                    email: string;
                };

                await connection();

                const user = await users.findOne({ email });

                if (!user) {
                    users.create({ name, surname, email, points: 0 });
                }
            }

            return true;
        },
    },
};

const AuthHandler = NextAuth(authOptions);

export { AuthHandler as GET, AuthHandler as POST };

import connection from "@/lib/connection";
import users from "@/model/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type credentials = {
    authType: "signin" | "signup";
    name?: string;
    surname?: string;
    email: string;
    password: string;
    avatar?: string;
};

export type user = {
    name?: string;
    surname?: string;
    email?: string;
    avatar?: string;
    points?: number;
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
                if (!credentials) return {};

                const { authType, email, password } = credentials as credentials;

                await connection();
                const user = await users.findOne({ email });

                if (authType == "signin") {
                    if (user && user.password == password) {
                        const { name, surname, avatar, points } = user;

                        return { name, surname, email, avatar, points } as any;
                    }
                } else if (authType == "signup") {
                    if (!user) {
                        const { name, surname, avatar } = credentials as credentials;

                        users.create({ name, surname, password, email, avatar, points: 0 });

                        return { name, surname, email, avatar, points: 0 } as any;
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
            const email: string = session?.user?.email as string;

            await connection();

            const user = await users.findOne({ email });

            const { name, surname, avatar, points } = user;

            session.user = { name, surname, email, avatar, points } as user;

            return session;
        },
        async signIn({ profile, account, user, credentials, email }) {
            if (account?.provider == "google") {
                const points = 0;

                const {
                    email,
                    given_name: name,
                    family_name: surname,
                    picture: avatar,
                } = profile as {
                    given_name: string;
                    family_name: string;
                    email: string;
                    picture: string;
                };

                await connection();

                const user = await users.findOne({ email });

                if (!user) {
                    users.create({ name, surname, email, avatar, points });
                }
            }

            return true;
        },
    },
};

const AuthHandler = NextAuth(authOptions);

export { AuthHandler as GET, AuthHandler as POST };

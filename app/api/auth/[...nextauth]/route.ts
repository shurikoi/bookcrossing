import connection from "@/lib/connection";
import hashPassword from "@/lib/hashPassword";
import users from "@/model/user";
import fs from "fs";
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
    imageData: string | undefined;
    imageName: string | undefined;
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
            async authorize(credentials) {
                const { authType, imageName, imageData, email, password } = credentials as credentials;

                await connection();

                if (imageData && imageName)
                    fs.writeFileSync("./public/avatars/" + imageName, Buffer.from(imageData.split(",")[1], "base64"));

                const user = await users.findOne({ email });
                const hashedPassword = await hashPassword(password);

                if (authType == "signin") {
                    if (user && user.password == hashedPassword) {
                        return { email } as any;
                    }
                } else if (authType == "signup") {
                    if (!user) {
                        const { name, surname } = credentials as credentials;

                        const path = imageName && imageData ? "/avatars" + imageName : "/avatars/01.png";

                        await users.create({ name, surname, password: hashedPassword, avatar: path, email });

                        return { email } as any;
                    }
                }
            },
        }),
        GoogleProvider({
            clientSecret: process.env.GOOGLE_SECRET as string,
            clientId: process.env.GOOGLE_CLIENT_ID as string,
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                const user = await users.findOne({ email: session.user?.email });

                session.user = {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    avatar: user.avatar,
                    points: user.points,
                    isPasswordExist: !!user.password,
                };
            } catch (error) {
                signOut()
            }

            return session;
        },
        async signIn({ profile, account }) {
            if (account?.provider == "google") {
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

                if (!user) users.create({ name, surname, email, provider: "google", avatar });
            }

            return true;
        },
    },
};

const AuthHandler = NextAuth(authOptions);

export { AuthHandler as GET, AuthHandler as POST };

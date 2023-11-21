import clientPromise from "@/lib/clientPromise";
import connection from "@/lib/connection";
import generateRandomString from "@/lib/generateRandomString";
import getExtension from "@/lib/getExtension";
import hashPassword from "@/lib/hashPassword";
import resizeImage from "@/lib/resizeImage";
import users from "@/model/user";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import fs from "fs";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type credentials = {
    authType: "signin" | "signup";
    name?: string;
    surname?: string;
    email: string;
    password: string;
    image?: string;
};

const date = new Date();

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { authType, image, email, password } = credentials as credentials;

                await connection();

                const user = await users.findOne({ email });
                const hashedPassword = await hashPassword(password);

                if (authType == "signin") {
                    if (user && user.password == hashedPassword) {
                        return { email } as any;
                    }
                } else if (authType == "signup") {
                    if (!user) {
                        const { name, surname } = credentials as credentials;

                        let path = "/avatars/01.png";

                        if (image) {
                            const extension = getExtension(image, true);
                            const randomName = generateRandomString() + "." + extension;

                            path = "/avatars/" + randomName;

                            const imageBuffer = Buffer.from(image.split(",")[1], "base64");

                            const resizedImage = await resizeImage(imageBuffer, 200, 200);

                            fs.writeFile("./public/avatars/" + randomName, resizedImage, () => {});
                        }

                        await users.create({ name, surname, password: hashedPassword, avatar: path, email, date });

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
    pages: {
        signIn: "/",
    },
    callbacks: {
        async jwt({ token }) {
            await connection();

            const user = await users.findOne({ email: token.email });

            if (user) {
                token.user = {
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    avatar: user.avatar,
                    points: user.points,
                    isPasswordExist: !!user.password,
                };
            } else {
                token.user = {
                    unauthenticated: true,
                };
            }

            // users.findOne({ email: token.email }).then((data) => console.log(data));

            return token;
        },
        async session({ session, token }) {
            try {
                session.user = token.user;

                return session;
            } catch (error) {}

            return session;
        },
        async signIn({ profile, account }) {
            if (account?.provider == "google" && profile) {
                const { email, given_name: name, family_name: surname, picture: avatar } = profile;

                await connection();

                const user = await users.findOne({ email });

                if (!user) users.create({ name, surname, email, provider: "google", avatar, date });
            }

            return true;
        },
    },
};

const AuthHandler = NextAuth(authOptions);

export const getUserSession = () => getServerSession(authOptions)

export { AuthHandler as GET, AuthHandler as POST };

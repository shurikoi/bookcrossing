import connection from "@/lib/connection";
import hashPassword from "@/lib/hashPassword";
import users from "@/model/user";
import { ObjectId } from "mongodb";
import NextAuth, { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

type credentials = {
  login: string;
  password: string;
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
        const { login, password } = credentials as credentials;

        await connection();

        const user = await users.findOne({ login });
        const hashedPassword = await hashPassword(password);

        if (user.password == hashedPassword) {
          return { id: user._id } as any;
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
    async jwt({ token, user }) {
      await connection();
      console.log(user, token);
      const foundUser = await users.findOne({ _id: user ? new ObjectId(user.id) : new ObjectId(token.user?.id) });

      if (foundUser) {
        token.user = {
          id: foundUser._id,
          login: foundUser.login,
          name: foundUser.name,
          surname: foundUser.surname,
          avatar: foundUser.avatar,
          points: foundUser.points,
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
      } catch (error) {}

      return session;
    },
    async signIn({ profile, account, user, email, credentials }) {
      const session = await getUserSession();
      
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

export const getUserSession = () => getServerSession(authOptions);

export { AuthHandler as GET, AuthHandler as POST };


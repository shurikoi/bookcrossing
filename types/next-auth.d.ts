import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string;
            surname?: string;
            email?: string;
            avatar?: string;
            points?: number;
        };
    }
}

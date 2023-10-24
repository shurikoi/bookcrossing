import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user?: {
            id?: string;
            name?: string;
            surname?: string;
            points?: number;
            avatar?: string;
            email?: string;
            isPasswordExist?: boolean;
            unauthenticated?: boolean;
        };
    }
}

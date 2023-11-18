import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth/jwt" {
    interface JWT {
        email: string;
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

declare module "next-auth" {
    export interface Profile {
        given_name: string;
        family_name: string;
        email: string;
        picture: string;
    }

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

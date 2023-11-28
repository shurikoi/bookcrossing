import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id?: string;
      login?: string;
      name?: string;
      surname?: string;
      points?: number;
      avatar?: string;
      unauthenticated?: boolean;
    };
  }
}

declare module "next-auth" {
  interface User {
    login: string;
  }

  interface Profile {
    given_name: string;
    family_name: string;
    email: string;
    picture: string;
  }

  interface Session {
    user?: {
      id?: string;
      login?: string;
      name?: string;
      surname?: string;
      points?: number;
      avatar?: string;
      unauthenticated?: boolean;
    };
  }
}

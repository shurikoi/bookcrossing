"use client";

import { useUserData } from "@/components/contexts/UserProviders";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function GoogleSignin() {
    const { user, loading } = useUserData();

    useEffect(() => {
        if (!loading) {
            if (!user) signIn("google");
            if (user) window.close();
        }
    }, [user, loading]);

    return <></>;
}

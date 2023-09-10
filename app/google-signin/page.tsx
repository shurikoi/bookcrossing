"use client";

import { useUserData } from "@/components/contexts/UserProviders";
import ContentLoader from "@/components/ui/ContentLoader";
import { signIn } from "next-auth/react";
import { useEffect } from "react";

export default function GoogleSignin() {
    const { user, loading } = useUserData();

    useEffect(() => {
        signIn("google");

        if (user && !loading) window.close();
    }, [user, loading]);

    if (loading) return <ContentLoader></ContentLoader>;
    return <></>;
}

"use client";

import ContentLoader from "@/components/ui/loaders/ContentLoader";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function GoogleSignin() {
    const { status } = useSession();

    useEffect(() => {
        signIn("google");
    }, []);

    useEffect(() => {
        if (status == "authenticated") window.close();
    }, [status]);

    return <ContentLoader></ContentLoader>;
}

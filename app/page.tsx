"use client";

import { useUserData } from "@/components/contexts/UserProvider";
import AuthorizedStartPage from "@/components/authorized/StartPage";
import UnauthorizedStartPage from "@/components/unauthorized/StartPage";
import PageLoader from "@/components/ui/PageLoader";
import { useEffect } from "react";

export default function Home() {
    const { user, loading } = useUserData();
    useEffect(() => {
        console.log(user, loading)
    if (user && !loading) document.body.style.overflow = "auto";
    }, [loading, user]);

    if (loading) return <PageLoader></PageLoader>;

    if (user) return <AuthorizedStartPage></AuthorizedStartPage>;

    return <UnauthorizedStartPage></UnauthorizedStartPage>;
}

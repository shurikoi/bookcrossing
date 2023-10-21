"use client";

import ContentLoader from "@/components/ui/ContentLoader";
import { useUserData } from "@/components/contexts/UserProvider";
import AuthorizedStartPage from "@/components/authorized/StartPage";
import UnauthorizedStartPage from "@/components/unauthorized/StartPage";

export default function Home() {
    const { user, loading } = useUserData();
    
    if (loading) return <ContentLoader></ContentLoader>;

    if (user)
        return <AuthorizedStartPage></AuthorizedStartPage>;

    return <UnauthorizedStartPage></UnauthorizedStartPage>;
}

"use client"

import ContentLoader from "@/components/ui/ContentLoader";
import { useUserData } from "@/components/contexts/UserProviders";
import AuthorizedStartPage from "@/components/AuthorizedStartPage";
import UnauthorizedStartPage from "@/components/UnauthorizedStartPage";

export default function Home() {
    const { user, loading } = useUserData();

    if (loading) return <ContentLoader></ContentLoader>;

    if (user) return <AuthorizedStartPage></AuthorizedStartPage>;

    return <UnauthorizedStartPage></UnauthorizedStartPage>;
}

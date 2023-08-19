"use client"

import Loader from "@/components/PageLoader";
import { useUserData } from "@/components/contexts/UserProviders";
import AuthorizedStartPage from "@/components/AuthorizedStartPage";
import UnauthorizedStartPage from "@/components/UnauthorizedStartPage";

export default function Home() {
    const { user, loading } = useUserData();

    if (loading) return <Loader></Loader>;

    if (user) return <AuthorizedStartPage></AuthorizedStartPage>;

    return <UnauthorizedStartPage></UnauthorizedStartPage>;
}

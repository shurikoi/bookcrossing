"use client";

import { useSession } from "next-auth/react";
import UnauthorizedStartPage from "./UnauthorizedStartPage";
import AuthorizedStartPage from "./AuthorizedStartPage";
import Loader from "./PageLoader";
import { useUserData } from "./contexts/UserProviders";

export default function mainLayout() {
    const { user, loading } = useUserData();

    if (loading) return <Loader></Loader>;

    if (user) return <AuthorizedStartPage></AuthorizedStartPage>;

    return <UnauthorizedStartPage></UnauthorizedStartPage>;
}

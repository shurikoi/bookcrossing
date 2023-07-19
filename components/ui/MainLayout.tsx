import { useSession } from "next-auth/react";
import UnauthorizedStartPage from "./UnauthorizedStartPage";
import AuthorizedStartPage from "./AuthorizedStartPage";
import Loader from "./Loader";

export default function mainLayout() {
    const { data: session, status } = useSession();

    if (status == "loading") return <Loader></Loader>

    if (session) return <AuthorizedStartPage></AuthorizedStartPage>;
    
    return <UnauthorizedStartPage></UnauthorizedStartPage>;
}

import AuthorizedHeader from "./Header";
import Publications from "./Publications";

export default function StartPage() {
    return (
        <>
            <AuthorizedHeader />
            <Publications />
        </>
    );
}

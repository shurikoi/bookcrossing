import AuthorizedHeader from "@/components/AuthorizedHeader";
import Publications from "./Publications";

export default function StartPage() {
    return (
        <>
            <AuthorizedHeader/>
            <Publications/>
        </>
    );
}

import AuthorizedHeader from "@/components/ui/AuthorizedHeader";
import Book from "./Book";

export default function StartPage() {
    return (
        <>
            <AuthorizedHeader></AuthorizedHeader>
            <Book></Book>
        </>
    );
}

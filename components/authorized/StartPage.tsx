import AuthorizedHeader from "./Header";
import Main from "./Main";

export default function StartPage() {
    return (
        <>
            <AuthorizedHeader />
            <Main></Main>
        </>
    );
}

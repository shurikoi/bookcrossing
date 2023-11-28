import AuthorizedHeader from "./Header";
import Main from "./Main";

export default function StartPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <AuthorizedHeader />
      <Main searchParams={searchParams}></Main>
    </>
  );
}

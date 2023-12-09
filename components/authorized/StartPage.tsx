import { BookProvider } from "../contexts/BookProvider";
import { FilterProvider } from "../contexts/FilterProvider";
import Header from "./Header";
import Main from "./Main";

export default function StartPage({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
  return (
    <FilterProvider
      paramsQuery={{
        filter: {
          categories: searchParams?.categories?.split(",") || [],
          languages: searchParams?.languages?.split(",") || [],
          states: searchParams?.states?.split(",") || [],
        },
        sort: searchParams?.sort == "desc" || searchParams?.sort == "asc" ? searchParams?.sort : "desc",
      }}
    >
      <BookProvider>
        <Header />
        <Main searchParams={searchParams}></Main>{" "}
      </BookProvider>
    </FilterProvider>
  );
}

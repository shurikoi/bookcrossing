import { useBook } from "@/components/contexts/BookProvider";
import bookConjugation from "@/lib/bookConjugation";
import { useFilter } from "../../contexts/FilterProvider";
import ResetIcon from "../../ui/icons/ResetIcon";
import ContentLoader from "../../ui/loaders/ContentLoader";
import FilterMenu from "./FilterMenu";
import SortMenu from "./SortMenu";

export default function FilterBar() {
  const { query, setChoosenCategories, setChoosenStates, setChoosenLanguages } = useFilter();

  const { isBooksLoading, setIsBooksLoading, setBooks, setPage, setHasMore, books, queryBooksCount } = useBook();

  // useLayoutEffect(() => {
  //   setIsBooksLoading(true);
  // }, [query]);

  function resetFilter() {
    if (isBooksLoading) return;

    const params = new URLSearchParams(window.location.search);

    setPage(0);
    setHasMore(true);
    setBooks([]);
    setIsBooksLoading(true);

    const sort = params.get("sort");

    history.pushState({}, "", sort ? `/?sort=${sort}` : "/");

    setChoosenCategories([]);
    setChoosenLanguages([]);
    setChoosenStates([]);
  }

  return (
    <div className="mt-12 px-4 text-center md:text-left relative flex flex-col md:flex-row gap-4 items-center justify-center md:gap-14 w-full py-3 shadow-[0px_0px_10px_1px_rgba(0,0,0,.1)]">
      <FilterMenu></FilterMenu>
      <div className="py-4 px-10 bg-[#FFF3E1] rounded-[5px] whitespace-nowrap">
        {isBooksLoading ? (
          <div className="w-6 h-6 relative">
            <ContentLoader />
          </div>
        ) : Object.values(query.filter).every((item) => item.length == 0) ? (
          "Wszystkie książki"
        ) : (
          <div className="flex gap-10">
            <div>
              {queryBooksCount} {bookConjugation(queryBooksCount)}
            </div>
            <div className="text-[#0072DA] font-medium flex gap-2 items-center cursor-pointer" onClick={resetFilter}>
              <ResetIcon></ResetIcon>
              Resetuj filtry
            </div>
          </div>
        )}
      </div>
      <SortMenu></SortMenu>
    </div>
  );
}

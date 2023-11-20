import { Dispatch, SetStateAction, useLayoutEffect } from "react";
import FilterMenu from "./FilterMenu";
import ContentLoader from "../../ui/loaders/ContentLoader";
import ResetIcon from "../../ui/icons/ResetIcon";
import { useFilter } from "../../contexts/FilterProvider";
import SortMenu from "./SortMenu";
import { useBook } from "@/components/contexts/BookProvider";

interface FilterBarProps {
    booksCount: number;
    booksQueryCount: number;
}

function bookConjugation(booksCount: number) {
    const lastDigit = booksCount % 10;

    if (lastDigit == 1) return "książka";
    else if (lastDigit >= 2 && lastDigit <= 4) return "książki";
    else if (lastDigit == 0 || lastDigit >= 5) return "książek";
}

export default function FilterBar({ booksCount, booksQueryCount }: FilterBarProps) {
    const filter = useFilter();

    const { isBooksLoading, setIsBooksLoading, books } = useBook();

    useLayoutEffect(() => {
        setIsBooksLoading(true);
    }, [filter.query]);

    function resetFilter() {
        const params = new URLSearchParams(window.location.search);

        const sort = params.get("sort");

        history.pushState({}, "", sort ? `/?sort=${sort}` : "/");

        filter.setChoosenCategories([]);
        filter.setChoosenLanguages([]);
        filter.setChoosenStates([]);
    }

    return (
        <div className="mt-12 px-4 text-center md:text-left relative flex flex-col md:flex-row gap-4 items-center justify-center md:gap-14 w-full py-3 shadow-[0px_0px_10px_1px_rgba(0,0,0,.1)]">
            <FilterMenu></FilterMenu>
            <div className="py-4 px-10 bg-[#FFF3E1] rounded-[5px] ">
                {Object.values(filter.query.filter).every((item) => item.length == 0)? (
                    "Wszystkie książki"
                ) : isBooksLoading ? (
                    <div className="w-6 h-6 relative">
                        <ContentLoader />
                    </div>
                ) : (
                    <div className="flex gap-10">
                        <div>
                            {booksQueryCount} {bookConjugation(booksQueryCount)}
                        </div>
                        <div
                            className="text-[#0072DA] font-medium flex gap-2 items-center cursor-pointer"
                            onClick={resetFilter}
                        >
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

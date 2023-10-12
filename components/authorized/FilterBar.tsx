import { useState } from "react";
import FilterMenu from "./FilterMenu";
import ContentLoader from "../ui/ContentLoader";
import ResetIcon from "../ui/icons/ResetIcon";
import { useFilter } from "../contexts/FilterProvider";
import SortMenu from "./SortMenu";

interface FilterBarProps {
    booksCount: number;
    booksQueryCount: number;
    isBooksLoading: boolean;
}

function bookConjugation(booksCount: number) {
    const lastDigit = booksCount % 10;

    if (lastDigit == 1) return "książka";
    else if (lastDigit >= 2 && lastDigit <= 4) return "książki";
    else if (lastDigit == 0 || lastDigit >= 5) return "książek";
}

export default function FilterBar({ booksCount, booksQueryCount, isBooksLoading }: FilterBarProps) {
    const filter = useFilter();

    function resetFilter() {
        history.pushState({}, "", "/");

        filter.setChoosenCategories([]);
        filter.setChoosenLanguages([]);
        filter.setChoosenStates([]);
        filter.setChoosenSort("asc");
    }

    return (
        <div className="mt-12 px-4 text-center md:text-left relative flex items-center justify-center gap-14 w-full py-3 shadow-[0px_0px_10px_1px_rgba(0,0,0,.1)]">
            <FilterMenu></FilterMenu>
            <div className="py-4 px-10 bg-[#FFF3E1] rounded-[5px] ">
                {isBooksLoading ? (
                    <div className="w-6 h-6 relative">
                        <ContentLoader />
                    </div>
                ) : JSON.stringify(Object.values(filter.query)) == JSON.stringify([[], [], [], "asc"]) ? (
                    "Wszyskie książki"
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

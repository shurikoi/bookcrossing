import { MouseEvent, useRef, useState } from "react";
import ArrowDownIcon from "../ui/icons/ArrowDownIcon";
import DropDownMenu from "../ui/DropDownMenu";
import { sort, useFilter } from "../contexts/FilterProvider";

export default function SortMenu() {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const filter = useFilter();

    const menuRef = useRef<HTMLDivElement>(null);

    const params = new URLSearchParams(window.location.search)

    function setSort(e: MouseEvent<HTMLDivElement>) {
        const sort = e.currentTarget.dataset.sort as sort;

        const newParams = new URLSearchParams(Array.from(params.entries()));

        filter.setChoosenSort(sort);
        newParams.set("sort", sort);
        
        setIsMenuActive(false);
        
        history.pushState({}, "", `/?${newParams}`);
    }

    return (
        <div ref={menuRef} className="relative">
            <div
                className="flex gap-3 items-center py-3 px-5 rounded-lg cursor-pointer select-none border border-[#A39EBE] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.15)]"
                onClick={() => setIsMenuActive((prev) => !prev)}
            >
                {filter.choosenSort == "asc" ? "Sortuj od najstarszych" : "Sortuj od najnowszych"}
                <ArrowDownIcon></ArrowDownIcon>
            </div>
            <DropDownMenu
                menuRef={menuRef}
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                className="absolute p-3 -bottom-2 right-0 w-max translate-y-full bg-white shadow-[0px_0px_49px_0px_rgba(0,0,0,0.25)] rounded-lg"
            >
                <div
                    className={`hover:bg-[#F0F1F9] p-2.5 duration-300 rounded-md cursor-pointer ${
                        filter.choosenSort == "desc" ? "bg-[#F0F1F9]" : null
                    }`}
                    data-sort="desc"
                    onClick={setSort}
                >
                    Od najnowszych do najstarszych
                </div>
                <div
                    className={`hover:bg-[#F0F1F9] p-2.5 duration-300 rounded-md cursor-pointer ${
                        filter.choosenSort == "asc" ? "bg-[#F0F1F9]" : null
                    }`}
                    data-sort="asc"
                    onClick={setSort}
                >
                    Od najstarszych do najnowszych
                </div>
            </DropDownMenu>
        </div>
    );
}

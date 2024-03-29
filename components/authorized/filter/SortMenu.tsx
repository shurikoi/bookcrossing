import { MouseEvent, useRef, useState } from "react";
import { useFilter } from "../../contexts/FilterProvider";
import DropDownMenu from "../../ui/DropDownMenu";
import ArrowDownIcon from "../../ui/icons/ArrowDownIcon";

export default function SortMenu() {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const filter = useFilter();

    const triggerRef = useRef<HTMLDivElement>(null);

    function setSort(e: MouseEvent<HTMLDivElement>) {
        const sort = e.currentTarget.dataset.sort;

        if (sort == "asc" || sort == "desc") {
            const params = new URLSearchParams(typeof window !== "undefined" ? window?.location.search : "");
            filter.setChoosenSort(sort);
            params.set("sort", sort);

            setIsMenuActive(false);

            history.pushState({}, "", `/?${params}`);
        }
    }

    return (
        <div ref={triggerRef} className="relative hidden 2md:block">
            <div
                className="flex gap-3 items-center py-3 px-5 rounded-lg cursor-pointer select-none border border-[#A39EBE] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.15)]"
                onClick={() => setIsMenuActive((prev) => !prev)}
            >
                {filter.choosenSort == "asc" ? "Sortuj od najstarszych" : "Sortuj od najnowszych"}
                <ArrowDownIcon></ArrowDownIcon>
            </div>
            <DropDownMenu
                triggerRef={triggerRef}
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                className="absolute p-3 -bottom-2 right-1/2 translate-x-1/2 2md:translate-x-0 2md:right-0 w-max translate-y-full bg-white shadow-[0px_0px_49px_0px_rgba(0,0,0,0.25)] rounded-lg"
            >
                <div
                    className={`hover:bg-[#F0F1F9] p-2.5 duration-300 rounded-md cursor-pointer ${
                        filter.choosenSort == "desc" ? "bg-[#F0F1F9]" : ""
                    }`}
                    data-sort="desc"
                    onClick={setSort}
                >
                    Od najnowszych do najstarszych
                </div>
                <div
                    className={`hover:bg-[#F0F1F9] p-2.5 duration-300 rounded-md cursor-pointer ${
                        filter.choosenSort == "asc" ? "bg-[#F0F1F9]" : ""
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

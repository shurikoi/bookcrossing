import { MouseEvent, useRef, useState } from "react";
import ArrowDownIcon from "../ui/icons/ArrowDownIcon";
import DropDownMenu from "../ui/DropDownMenu";
import { sort, useFilter } from "../contexts/FilterProvider";

export default function SortMenu() {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const filter = useFilter();

    const menuRef = useRef<HTMLDivElement>(null);

    function setSort(e: MouseEvent<HTMLDivElement>) {
        const sort = e.currentTarget.dataset.sort as sort;
        
        setIsMenuActive(false);

        filter.setChoosenSort(sort);
    }

    return (
        <div ref={menuRef} className="relative">
            <div
                className="flex gap-3 items-center py-3 px-5 rounded-lg cursor-pointer select-none border border-[#A39EBE] shadow-[0px_0px_15px_0px_rgba(0,0,0,0.15)]"
                onClick={() => setIsMenuActive((prev) => !prev)}
            >
                Sortuj według
                <ArrowDownIcon></ArrowDownIcon>
            </div>
            <DropDownMenu
                menuRef={menuRef}
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                className="absolute p-3 -bottom-2 right-0 w-max translate-y-full bg-white shadow-[0px_0px_49px_0px_rgba(0,0,0,0.25)] rounded-lg"
            >
                <div
                    className="hover:bg-[#F0F1F9] p-2.5 duration-300 rounded-md cursor-pointer"
                    data-sort="desc"
                    onClick={setSort}
                >
                    Od najnowszych do najstarszych
                </div>
                <div
                    className="hover:bg-[#F0F1F9] p-2.5 duration-300 rounded-md cursor-pointer"
                    data-sort="asc"
                    onClick={setSort}
                >
                    Od najstarszych do najnowszych
                </div>
            </DropDownMenu>
        </div>
    );
}

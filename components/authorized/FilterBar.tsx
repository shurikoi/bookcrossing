import { memo, useState } from "react";
import FilterMenu from "./FilterMenu";

export default function FilterBar() {
    const [isFilterMenuActive, setIsFilterMenuActive] = useState(false);
    const [isSortMenuActive, setIsSortMenuActive] = useState(false);

    return (
        <div className="px-4 text-center md:text-left relative flex items-center justify-center gap-14 w-full py-3 shadow-[0px_4px_48px_0px_rgba(147,233,94,0.25)]">
            <FilterMenu isMenuActive={isFilterMenuActive} setIsMenuActive={setIsFilterMenuActive}></FilterMenu>
            <div className="py-4 px-10 bg-[#FFF3E1] rounded-[5px]">Wszystkie książki</div>
            <div>Sortuj według</div>
        </div>
    );
}

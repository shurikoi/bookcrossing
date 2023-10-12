import { ChangeEvent, Dispatch, SetStateAction, memo, useEffect, useRef, useState } from "react";
import DropDownMenu from "../ui/DropDownMenu";
import { useFilter } from "../contexts/FilterProvider";
import ArrowDownIcon from "../ui/icons/ArrowDownIcon";

const categories = [
    "Powieść historyczna",
    "Kryminał",
    "Fantastyka",
    "Romans",
    "Science Fiction",
    "Horror",
    "Literatura podróżnicza",
    "Dramat",
    "Poezja",
    "Biografia",
];

const languages = ["Angielski", "Polski", "Ukraiński"];

const bookStates = ["Nowa", "Jak nowa", "Bardzo dobry", "Dobry", "Przeciętny", "Zły"];

// interface FilterMenuProps {
//     isMenuActive: boolean;
//     setIsMenuActive: Dispatch<SetStateAction<boolean>>;
// }

export default memo(function FilterMenu() {
    const menuRef = useRef<HTMLDivElement>(null);

    const [isMenuActive, setIsMenuActive] = useState(false);

    const params = new URLSearchParams(window.location.search);

    const filter = useFilter();
    // const choosenCategories = params.get("categories");
    // const choosenLanguages = params.get("languages");
    // const choosenStates = params.get("states");

    function setCategories(e: ChangeEvent<HTMLInputElement>) {
        const newParams = new URLSearchParams(Array.from(params.entries()));
        const categories = newParams.get("categories")?.split(",") || [];

        if (categories.includes(e.target.id)) categories.splice(categories.indexOf(e.target.id), 1);
        else categories.push(e.target.id);

        newParams.set("categories", categories.join(","));
        filter.setChoosenCategories(() => {
            if (categories.join(",").length == 0) return [];

            return categories;
        });

        if (categories.join().length == 0) newParams.delete("categories");

        history.pushState({}, "", newParams.size > 0 ? `/?${newParams}` : "/");
    }

    function setLanguages(e: ChangeEvent<HTMLInputElement>) {
        const newParams = new URLSearchParams(Array.from(params.entries()));
        const languages = newParams.get("languages")?.split(",") || [];

        if (languages.includes(e.target.id)) languages.splice(languages.indexOf(e.target.id), 1);
        else languages.push(e.target.id);

        newParams.set("languages", languages?.join(","));
        filter.setChoosenLanguages(() => {
            if (languages.join(",").length == 0) return [];

            return languages;
        });

        if (languages.join().length == 0) newParams.delete("languages");

        history.pushState({}, "", newParams.size > 0 ? `/?${newParams}` : "/");
    }

    function setStates(e: ChangeEvent<HTMLInputElement>) {
        const newParams = new URLSearchParams(Array.from(params.entries()));
        const states = newParams.get("states")?.split(",") || [];

        if (states.includes(e.target.id)) states.splice(states.indexOf(e.target.id), 1);
        else states.push(e.target.id);

        newParams.set("states", states?.join(","));
        filter.setChoosenStates(() => {
            if (states.join(",").length == 0) return [];

            return states;
        });

        if (states.join().length == 0) newParams.delete("states");

        history.pushState({}, "", newParams.size > 0 ? `/?${newParams}` : "/");
    }

    return (
        <div ref={menuRef}>
            <div
                onClick={() => setIsMenuActive((prev) => !prev)}
                className="flex gap-3 items-center py-3 px-5 rounded-lg cursor-pointer select-none border-2 border-[#3F3A5A]"
            >
                Filtruj według
                <ArrowDownIcon></ArrowDownIcon>
            </div>
            <DropDownMenu
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                menuRef={menuRef}
                className="flex flex-col md:flex-row justify-center gap-20 left-0 top-full w-full absolute h-fit p-6 bg-white shadow-[0px_5px_5px_1px_rgba(0,0,0,.1)]"
            >
                <div className="text-left pl-[30%] md:pl-0 font-inter text-[#3F3A5A] text-[16px] w-full md:w-auto md:px-0">
                    <div className="font-semibold mb-3">Kategoria</div>
                    <div className="">
                        {categories.map((category) => (
                            <label
                                htmlFor={category}
                                key={category}
                                className="flex gap-2 items-center select-none cursor-pointer"
                            >
                                <input
                                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer"
                                    type="checkbox"
                                    checked={filter.choosenCategories?.includes(category)}
                                    id={category}
                                    onChange={setCategories}
                                />
                                <label className="cursor-pointer" htmlFor={category}>
                                    {category}
                                </label>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="text-left pl-[30%] md:pl-0 font-inter text-[#3F3A5A] text-[16px] w-full md:w-auto md:px-0">
                    <div className="font-semibold mb-3">Języki</div>
                    <div className="">
                        {languages.map((language) => (
                            <label
                                htmlFor={language}
                                key={language}
                                className="flex gap-2 items-center select-none cursor-pointer"
                            >
                                <input
                                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer"
                                    type="checkbox"
                                    checked={filter.choosenLanguages?.includes(language)}
                                    id={language}
                                    onChange={setLanguages}
                                />
                                <label htmlFor={language} className="select-none cursor-pointer">
                                    {language}
                                </label>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="text-left pl-[30%] md:pl-0 font-inter text-[#3F3A5A] text-[16px] w-full md:w-auto md:px-0">
                    <div className="font-semibold mb-3">Stan</div>
                    <div className="">
                        {bookStates.map((bookState) => (
                            <label
                                htmlFor={bookState}
                                className="flex gap-2 items-center select-none cursor-pointer w-full"
                                key={bookState}
                            >
                                <input
                                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer"
                                    type="checkbox"
                                    checked={filter.choosenStates?.includes(bookState)}
                                    id={bookState}
                                    onChange={setStates}
                                />
                                <label htmlFor={bookState} className="select-none cursor-pointer">
                                    {bookState}
                                </label>
                            </label>
                        ))}
                    </div>
                </div>
            </DropDownMenu>
        </div>
    );
});

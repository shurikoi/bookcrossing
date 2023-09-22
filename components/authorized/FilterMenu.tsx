import { Dispatch, SetStateAction, useRef } from "react";
import DropDownMenu from "../DropDownMenu";

interface FilterMenuProps {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

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

const languages = ["Polski", "Ukraiński"];

const BookConditions = ["Bardzo dobry", "Dobry"];

export default function FilterMenu({ isMenuActive, setIsMenuActive }: FilterMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={menuRef}>
            <div onClick={() => setIsMenuActive((prev) => !prev)} className="cursor-pointer select-none">
                Filtruj według
            </div>
            <DropDownMenu
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                menuRef={menuRef}
                className="flex flex-col md:flex-row justify-center gap-20 left-0 top-full w-full absolute h-fit p-6 bg-white"
            >
                <div className="text-left pl-[30%] md:pl-0 font-inter text-[#3F3A5A] text-[16px] w-full md:w-aut md:px-0">
                    <div className="font-semibold mb-3">Kategoria</div>
                    <div className="">
                        {categories.map((category) => (
                            <label htmlFor={category} className="flex gap-2 items-center select-none cursor-pointer">
                                <input
                                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer"
                                    type="checkbox"
                                    name=""
                                    id={category}
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
                            <label htmlFor={language} className="flex gap-2 items-center select-none cursor-pointer">
                                <input
                                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer"
                                    type="checkbox"
                                    name=""
                                    id={language}
                                />
                                <label htmlFor={language} className="select-none cursor-pointer">
                                    {language}
                                </label>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="text-left pl-[30%] md:pl-0 font-inter text-[#3F3A5A] text-[16px] w-full md:w-aut md:px-0">
                    <div className="font-semibold mb-3">Stan</div>
                    <div className="">
                        {BookConditions.map((BookCondition) => (
                            <label
                                htmlFor={BookCondition}
                                className="flex gap-2 items-center select-none cursor-pointer w-full"
                            >
                                <input
                                    className="border-2 border-[#747474] bg-white w-[15px] h-[15px] rounded-sm appearance-none checked:bg-[#2D50AA] checked:border-[#2D50AA] duration-200 cursor-pointer"
                                    type="checkbox"
                                    name=""
                                    id={BookCondition}
                                />
                                <label htmlFor={BookCondition} className="select-none cursor-pointer">
                                    {BookCondition}
                                </label>
                            </label>
                        ))}
                    </div>
                </div>
            </DropDownMenu>
        </div>
    );
}

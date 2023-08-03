import React, { Dispatch, RefObject, SetStateAction } from "react";
import { publicationData } from "./PublicationForm";

type CategoriesMenu = {
    menuRef: RefObject<HTMLDivElement>;
    categories: string[];
    filteredCategories: string[];
    menuActive: boolean;
    categoryValue: string;
    selectedCategory: number;
    setSelectedCategory: Dispatch<SetStateAction<number>>;
    setCategoryValue: Dispatch<SetStateAction<string>>;
    setBookData: Dispatch<SetStateAction<publicationData>>;
};

export default function CategoriesMenu({
    menuRef,
    categories,
    categoryValue,
    setCategoryValue,
    menuActive,
    filteredCategories,
    setBookData,
    selectedCategory,
    setSelectedCategory,
}: CategoriesMenu) {
    return (
        <div
            className="absolute left-0 bottom-[-16px] translate-y-[100%] shadow-lg rounded-lg flex flex-col bg-white duration-200 max-h-[203px] transition-opacity w-max overflow-auto"
            ref={menuRef}
            style={menuActive ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }}
        >
            {filteredCategories.map((category, index) => (
                <div
                    className={`cursor-pointer duration-200 p-2.5 ${selectedCategory == index ? "bg-[#F2F9F0]" : ""}`}
                    key={category}
                    onMouseOver={() => setSelectedCategory(index)}
                    onMouseDown={() => {
                        setCategoryValue(category);
                        setBookData((bookData) => {
                            return { ...bookData, category };
                        });
                    }}
                >
                    <span className="p-1.5 bg-[#F2F9F0]">{category}</span>
                </div>
            ))}
            {!categories.includes(categoryValue) && categoryValue.trim().length != 0 && (
                <div
                    className="cursor-pointer transition-colors duration-200 hover:bg-[#F2F9F0] p-2.5"
                    onMouseDown={() => {
                        setCategoryValue(categoryValue);
                        setBookData((bookData) => {
                            return { ...bookData, category: categoryValue };
                        });
                    }}
                >
                    Stworzyć <span className="p-1.5 bg-[#F2F9F0]">{categoryValue}</span>
                </div>
            )}
        </div>
    );
}

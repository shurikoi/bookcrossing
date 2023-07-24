import { Dispatch, SetStateAction } from "react";

type CategoriesMenu = {
    categories: string[];
    menuActive: boolean;
    categoryValue: string;
    setCategoryValue: Dispatch<SetStateAction<string>>;
};

export default function CategoriesMenu({ categories, categoryValue, setCategoryValue, menuActive }: CategoriesMenu) {
    return (
        <div
            className="absolute left-0 bottom-[-16px] translate-y-[100%] shadow-lg rounded-lg flex flex-col bg-white duration-200 max-h-[203px] w-max overflow-auto"
            style={true ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }}
        >
            {categories.map(
                (category) =>
                    category.toLowerCase().includes(categoryValue.toLowerCase()) && (
                        <div
                            className="cursor-pointer duration-200 hover:bg-[#F2F9F0] p-2.5"
                            key={category}
                            onMouseDown={() => setCategoryValue(category)}
                        >
                            <span className="p-1.5 bg-[#F2F9F0]">{category}</span>
                        </div>
                    )
            )}
            {(!categories.includes(categoryValue) && categoryValue.trim() != "") && (
                <div
                    className="cursor-pointer duration-200 hover:bg-[#F2F9F0] p-2.5"
                    onMouseDown={() => setCategoryValue(categoryValue)}
                >
                    Stworzyć <span className="p-1.5 bg-[#F2F9F0]">{categoryValue}</span>
                </div>
            )}
        </div>
    );
}

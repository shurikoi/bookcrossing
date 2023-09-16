import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import CategoriesMenu from "./CategoriesMenu";

type categories = {
    categories: string[];
    setCategory: Dispatch<SetStateAction<string>>;
    error: boolean;
    category: string;
};

export default function Categories({ categories, setCategory, error, category }: categories) {
    const [categoriesMenuActive, setCategoriesMenuActive] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(0);
    const [filteredCategories, setFilteredCategories] = useState<string[]>(categories);

    const menuRef = useRef<HTMLDivElement>(null);

    function validateSelectedCategory(selectedCategory: number) {
        if (selectedCategory > filteredCategories.length - 1) return 0;
        else if (selectedCategory < 0) return filteredCategories.length - 1;
        return selectedCategory;
    }

    useEffect(() => {
        const newCategories: string[] = categories.filter(
            (categoryItem) => categoryItem.toLowerCase().includes(category.toLowerCase()) && category != categoryItem
        );

        if (filteredCategories != newCategories) setSelectedCategory(0);

        setFilteredCategories(newCategories);

        categories.forEach((categoryItem) => {
            if (categoryItem.toLowerCase() == category.toLowerCase()) {
                setCategory(categoryItem);
            }
        });
    }, [category]);

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "ArrowDown") {
            setSelectedCategory((selectedCategory) => {
                const newSelectedCategory = validateSelectedCategory(selectedCategory + 1);
                const selectedYPost = newSelectedCategory * 41;

                if (
                    menuRef.current &&
                    (selectedYPost < menuRef.current.scrollTop ||
                        selectedYPost >= menuRef.current.scrollHeight - 5 * 41 + menuRef.current.scrollTop)
                )
                    menuRef.current?.scrollTo({
                        top: (newSelectedCategory - 4) * 41,
                        behavior: "smooth",
                    });

                return newSelectedCategory;
            });
        } else if (e.key == "ArrowUp") {
            setSelectedCategory((selectedCategory) => {
                const newSelectedCategory = validateSelectedCategory(selectedCategory - 1);
                const selectedYPost = newSelectedCategory * 41;

                if (
                    menuRef.current &&
                    (selectedYPost < menuRef.current.scrollTop ||
                        selectedYPost >= menuRef.current.scrollHeight - 5 * 41 + menuRef.current.scrollTop)
                )
                    menuRef.current?.scrollTo({
                        top: newSelectedCategory * 41,
                        behavior: "smooth",
                    });

                return newSelectedCategory;
            });
        } else if (e.key == "Enter") {
            setCategory(categories[selectedCategory]);
        }
    }

    return (
        <div className="relative z-10">
            <input
                type="text"
                placeholder="wybierz..."
                className={`${error ? "placeholder:text-[#DD0000]" : ""}`}
                value={category}
                onKeyDown={handleKeyDown}
                onInput={(e) => setCategory((e.target as HTMLInputElement).value)}
                onFocus={() => {
                    setSelectedCategory(0);
                    setCategoriesMenuActive(true);
                }}
                onBlur={() => setCategoriesMenuActive(false)}
            ></input>
            <CategoriesMenu
                menuRef={menuRef}
                categories={categories}
                filteredCategories={filteredCategories}
                category={category}
                setSelectedCategory={setSelectedCategory}
                menuActive={categoriesMenuActive}
                setCategory={setCategory}
                selectedCategory={selectedCategory}
            />
        </div>
    );
}

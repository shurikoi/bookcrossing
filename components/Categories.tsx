import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { publicationData } from "./PublicationForm";
import CategoriesMenu from "./CategoriesMenu";

type categories = {
    categories: string[];
    setCategory: Dispatch<SetStateAction>;
    error: boolean;
};

export default function Categories({ categories, setCategory, error }: categories) {
    const [categoriesMenuActive, setCategoriesMenuActive] = useState(false);
    const [categoryValue, setCategoryValue] = useState(""); // input value
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
            (category) => category.toLowerCase().includes(categoryValue.toLowerCase()) && category != categoryValue
        );

        if (filteredCategories != newCategories) setSelectedCategory(0);

        setFilteredCategories(newCategories);

        categories.forEach((category) => {
            if (category.toLowerCase() == categoryValue.toLowerCase()) {
                setCategory(categoryValue);
                setCategoryValue(category);
            }
        });
    }, [categoryValue]);

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
            setCategoryValue(categories[selectedCategory]);
            setCategory(categories[selectedCategory]);
        }
    }

    return (
        <>
            <input
                type="text"
                placeholder="wybierz..."
                value={categoryValue}
                onKeyDown={handleKeyDown}
                onInput={(e) => setCategoryValue((e.target as HTMLInputElement).value)}
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
                categoryValue={categoryValue}
                setCategoryValue={setCategoryValue}
                setSelectedCategory={setSelectedCategory}
                menuActive={categoriesMenuActive}
                setCategory={setCategory}
                selectedCategory={selectedCategory}
            />
        </>
    );
}

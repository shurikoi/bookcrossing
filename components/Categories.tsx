import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { publicationData } from "./PublicationForm";
import CategoriesMenu from "./CategoriesMenu";

type categories = {
    categories: string[];
    setBookData: Dispatch<SetStateAction<publicationData>>;
    error: boolean;
};

export default function Categories({ categories, setBookData, error }: categories) {
    const [categoriesMenuActive, setCategoriesMenuActive] = useState<boolean>(false);
    const [categoryValue, setCategoryValue] = useState<string>(""); // input value
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
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
                setBookData((bookData) => {
                    return { ...bookData, category: categoryValue };
                });
                setCategoryValue(category);
            }
        });
    }, [categoryValue]);

    function handleKeyDown(e: KeyboardEvent) {
        const elementYPos = selectedCategory * 41;
        /// нужно найти область видимости (подсказка : 5 * 41 + scrollTop)
        if (e.key == "ArrowDown") {
            setSelectedCategory((selectedCategory) => {
                const newSelectedCategory = validateSelectedCategory(selectedCategory + 1);

                console.log(newSelectedCategory);
                menuRef.current?.scrollTo({
                    top: (newSelectedCategory - 4) * 41,
                    behavior: "smooth",
                });

                return newSelectedCategory;
            });
        } else if (e.key == "ArrowUp") {
            setSelectedCategory((selectedCategory) => {
                const newSelectedCategory = validateSelectedCategory(selectedCategory - 1);

                console.log(newSelectedCategory);
                menuRef.current?.scrollTo({
                    top: (newSelectedCategory - 4) * 41,
                    behavior: "smooth",
                });

                return newSelectedCategory;
            });
        } else if (e.key == "Enter") {
            setCategoryValue(categories[selectedCategory]);
            setBookData((bookData) => {
                return { ...bookData, category: categories[selectedCategory] };
            });
        }
    }

    return (
        <>
            <input
                className={`${error ? "placeholder:text-red-400" : ""}`}
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
                setBookData={setBookData}
                selectedCategory={selectedCategory}
            />
        </>
    );
}

import { FormEvent, FormEventHandler, KeyboardEvent, useEffect, useRef, useState } from "react";
import TagIcon from "./ui/TagIcon";
import ProfileIcon from "./ui/ProfileIcon";
import LinkIcon from "./ui/LinkIcon";
import Book from "./ui/Book";
import CategoriesMenu from "./CategoriesMenu";
import { useSession } from "next-auth/react";
import ContentLoader from "./ContentLoader";

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

export type publicationData = {
    title: string;
    author: string;
    category: string;
    description: string;
    image: {
        name: string;
        url: string;
        file?: File;
    };
};

type errors = {
    title: boolean;
    author: boolean;
    category: boolean;
    image: boolean;
    hasErrors: boolean;
};

export default function PublicationForm() {
    const { data: session, status } = useSession();

    const [data, setData] = useState<publicationData>({
        description: "",
        author: "",
        title: "",
        category: "",
        image: {
            name: "wybierz...",
            url: "",
        },
    });

    const [categoryValue, setCategoryValue] = useState<string>("");
    const [categoriesMenuActive, setCategoriesMenuActive] = useState<boolean>(false);

    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [filteredCategories, setFilteredCategories] = useState<string[]>(categories);

    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);

    const imageRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<errors>({
        title: false,
        author: false,
        category: false,
        image: false,
        hasErrors: false,
    });

    function handleInputFile(e: FormEvent<HTMLInputElement>) {
        const files = (e.target as HTMLInputElement).files;

        if (files && files[0]) {
            setData({
                ...data,
                image: {
                    name: files[0].name,
                    url: URL.createObjectURL(files[0]),
                    file: files[0],
                },
            });
        }
    }

    function validateData(data: publicationData) {
        const { title, author, category, image } = data;
        const errors = {
            title: false,
            author: false,
            image: false,
            category: false,
            hasErrors: false,
        };
        console.log(image)
        if (title.length == 0) errors.title = true;
        if (author.length == 0) errors.author = true;
        if (category.trim() == "") errors.category = true;
        if (!image.file) errors.image = true;

        setErrors(errors);

        for (let [key, value] of Object.entries(errors)) {
            if (value) setErrors({ ...errors, hasErrors: true });
            return { hasErrors: true };
        }
        return {hasErrors: false}
    }

    useEffect(() => {
        if (selectedCategory > filteredCategories.length - 1) setSelectedCategory(0);
        else if (selectedCategory < 0) setSelectedCategory(filteredCategories.length - 1);
    }, [selectedCategory]);

    useEffect(() => {
        const newCategories: string[] = categories.filter(
            (category) => category.toLowerCase().includes(categoryValue.toLowerCase()) && category != categoryValue
        );

        if (filteredCategories != newCategories) setSelectedCategory(0);

        setFilteredCategories(newCategories);

        categories.forEach((category) => {
            if (category.toLowerCase() == categoryValue.toLowerCase()) {
                setData({ ...data, category: categoryValue });
                setCategoryValue(category);
            }
        });
    }, [categoryValue]);

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "ArrowDown") setSelectedCategory((selectedCategory) => selectedCategory + 1);
        else if (e.key == "ArrowUp") setSelectedCategory((selectedCategory) => selectedCategory - 1);
        else if (e.key == "Enter") {
            setCategoryValue(categories[selectedCategory]);
            setData({ ...data, category: categories[selectedCategory] });
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-16">
                <div className="flex flex-col gap-5">
                    <input
                        className={`w-full font-head font-normal placeholder:text-[#9A9A9A] duration-200 text-lg border-b  ${
                            errors.title ? "border-b-red-400" : "border-b-black/40"
                        }`}
                        type="text"
                        value={data.title}
                        onInput={(e) => setData({ ...data, title: (e.target as HTMLInputElement).value })}
                        placeholder="Bez tytułu"
                    />
                    <div className="flex gap-12 font-extralight text-[14px]">
                        <div className="text-left flex flex-col gap-5">
                            <div className="flex gap-3 items-center">
                                <TagIcon></TagIcon>
                                <div>Kategoria</div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <ProfileIcon></ProfileIcon>
                                <div>Autor</div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <LinkIcon></LinkIcon>
                                <div>Zdjęcie</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="relative">
                                <input
                                    className={`${
                                        errors.title ? "placeholder:text-red-400" : ""
                                    }`}
                                    type="text"
                                    placeholder="wybierz..."
                                    value={categoryValue}
                                    onKeyDown={handleKeyDown}
                                    onInput={(e) => setCategoryValue((e.target as HTMLInputElement).value)}
                                    onFocus={() => setCategoriesMenuActive(true)}
                                    onBlur={() => setCategoriesMenuActive(false)}
                                ></input>
                                <CategoriesMenu
                                    categories={categories}
                                    filteredCategories={filteredCategories}
                                    categoryValue={categoryValue}
                                    setCategoryValue={setCategoryValue}
                                    setSelectedCategory={setSelectedCategory}
                                    menuActive={categoriesMenuActive}
                                    setData={setData}
                                    selectedCategory={selectedCategory}
                                />
                            </div>
                            <input
                                className={`placeholder:text-[#9A9A9A] border-b ${
                                    errors.title ? "border-b-red-400" : "border-b-black/40"
                                }`}
                                type="text"
                                value={data.author}
                                onInput={(e) => setData({ ...data, author: (e.target as HTMLInputElement).value })}
                                placeholder="wprowadź tutaj..."
                            />
                            <div
                                className={`${data.image.name == "wybierz..." && errors.image ? "text-red-400" : "text-[#9A9A9A]"} cursor-pointer`}
                                onClick={() => imageRef.current?.click()}
                            >
                                {data.image.name}
                            </div>
                            <input
                                ref={imageRef}
                                type="file"
                                onInput={handleInputFile}
                                placeholder="wybierz..."
                                hidden
                            />
                        </div>
                    </div>
                    <div className="mt-auto font-inter text-xs font-light">
                        Napisz jak się z Tobą skontaktować. <br />
                        Tutaj możesz także dodać dodatkowe informacje.
                    </div>
                </div>
                <Book author={data.author} title={data.title} date="Dzisiaj" image={data.image.url} />
            </div>

            <textarea
                value={data.description}
                onInput={(e) => setData({ ...data, description: (e.target as HTMLTextAreaElement).value })}
                className="font-inter text-sm resize-none w-full h-36 cursor-auto "
                placeholder="Zacznij pisać"
            ></textarea>
            {isSubmitButtonDisabled ? (
                <ContentLoader />
            ) : (
                <div
                    className={`${
                        isSubmitButtonDisabled ? "text-gray-400" : "text-black"
                    } duration-200 cursor-pointer w-fit`}
                    onClick={() => {
                        if (isSubmitButtonDisabled) return;
                        setIsSubmitButtonDisabled(true);

                        const { hasErrors } = validateData(data);

                        if (hasErrors) {
                            setTimeout(() => {
                                setIsSubmitButtonDisabled(false)
                            }, 250)
                            return
                        };

                        const form = new FormData();

                        form.append("image", data.image.file!);
                        form.append("imageName", data.image.file!.name);
                        form.append("author", data.author);
                        form.append("owner", session!.user._id!);
                        form.append("title", data.title);
                        form.append("description", data.description);
                        form.append("category", data.category);

                        fetch("/api/createPublication", {
                            method: "POST",
                            body: form,
                        })
                            .then((res) => res.json())
                            .then(() => window.location.reload());
                    }}
                >
                    Potwierdź
                </div>
            )}
        </div>
    );
}

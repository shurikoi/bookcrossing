import { FormEvent, FormEventHandler, KeyboardEvent, useEffect, useRef, useState } from "react";
import TagIcon from "./ui/TagIcon";
import ProfileIcon from "./ui/ProfileIcon";
import LinkIcon from "./ui/LinkIcon";
import Book from "./ui/Book";
import CategoriesMenu from "./CategoriesMenu";
import { useSession } from "next-auth/react";
import { data } from "./Publications";

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

export default function PublicationForm() {
    const { data: session, status } = useSession();

    const [description, setDescription] = useState<string>("");
    const [author, setAuthor] = useState<string>("Autor");
    const [title, setTitle] = useState<string>("Tytuł");

    const [categoryValue, setCategoryValue] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [categoriesMenuActive, setCategoriesMenuActive] = useState<boolean>(false);

    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [filteredCategories, setFilteredCategories] = useState<string[]>(categories);

    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState<boolean>(false);

    const [image, setImage] = useState<{ name: string; url: string; file?: File }>({
        name: "wybierz...",
        url: "",
    });

    const imageRef = useRef<HTMLInputElement>(null);

    function handleInputFile(e: FormEvent<HTMLInputElement>) {
        const files = (e.target as HTMLInputElement).files;

        if (files && files[0]) {
            setImage({
                name: files[0].name,
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        }
    }

    function validateData(data: data) {}

    useEffect(() => {
        if (selectedCategory > filteredCategories.length - 1) setSelectedCategory(0);
        else if (selectedCategory < 0) setSelectedCategory(filteredCategories.length - 1);
    }, [selectedCategory]);

    useEffect(() => {
        const newCategories: string[] = categories.filter((category) =>
            category.toLowerCase().includes(categoryValue.toLowerCase()) && category != categoryValue
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
        if (e.key == "ArrowDown") setSelectedCategory((selectedCategory) => selectedCategory + 1);
        else if (e.key == "ArrowUp") setSelectedCategory((selectedCategory) => selectedCategory - 1);
        else if (e.key == "Enter") {
            setCategoryValue(categories[selectedCategory]);
            setCategory(categories[selectedCategory]);
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-16">
                <div className="flex flex-col gap-5">
                    <input
                        className="w-full font-head font-normal placeholder:text-[#9A9A9A] text-lg border-b border-b-black/40"
                        type="text"
                        value={title}
                        onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
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
                                    setCategory={setCategory}
                                    selectedCategory={selectedCategory}
                                />
                            </div>
                            <input
                                className="placeholder:text-[#9A9A9A] border-b border-b-black/40"
                                type="text"
                                value={author}
                                onInput={(e) => setAuthor((e.target as HTMLInputElement).value)}
                                placeholder="wprowadź tutaj..."
                            />
                            <div
                                className={`${image.name == "wybierz..." && "text-[#9A9A9A]"} cursor-pointer`}
                                onClick={() => imageRef.current?.click()}
                            >
                                {image.name}
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
                <Book author={author} title={title} date="Dzisiaj" image={image.url} />
            </div>

            <textarea
                value={description}
                onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
                className="font-inter text-sm resize-none w-full h-36 cursor-auto "
                placeholder="Zacznij pisać"
            ></textarea>
            <div
                className={`${
                    isSubmitButtonDisabled ? "text-gray-400" : "text-black"
                } duration-200 cursor-pointer w-fit`}
                onClick={() => {
                    if (isSubmitButtonDisabled) return;
                    setIsSubmitButtonDisabled(true);
                    
                    const form = new FormData();

                    form.append("image", image.file!);
                    form.append("imageName", image.file!.name || "");
                    form.append("author", author);
                    form.append("owner", session!.user._id!);
                    form.append("title", title);
                    form.append("description", description);
                    form.append("category", category);

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
        </div>
    );
}

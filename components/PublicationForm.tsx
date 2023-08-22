import { FormEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Book from "./ui/Book";
import TagIcon from "./ui/TagIcon";
import LinkIcon from "./ui/LinkIcon";
import Categories from "./Categories";
import ProfileIcon from "./ui/ProfileIcon";
import ContentLoader from "./ui/ContentLoader";
import WarningIcon from "./ui/WarningIcon";

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
    owner: string;
    imageName: string;
    image: File;
};

interface image {
    url: string;
    file: File | undefined;
}

type errors = {
    title: boolean;
    author: boolean;
    category: boolean;
    image: boolean;
    hasErrors: boolean;
};

export default function PublicationForm() {
    const { data: session } = useSession();

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState<image>({
        url: "",
        file: undefined,
    });

    const data = {
        author,
        title,
        description,
        category,
        image: image.url,
        owner: session?.user.id!,
        date: "Dzisiaj"
    };

    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

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
            setImage({
                url: URL.createObjectURL(files[0]),
                file: files[0],
            });
        }
    }

    function handleSubmit() {
        if (isSubmitButtonDisabled) return;
        setIsSubmitButtonDisabled(true);

        const form = new FormData();

        form.append("image", image.file!);
        form.append("imageName", image.file?.name!);
        form.append("author", author);
        form.append("owner", session?.user.id!);
        form.append("title", title);
        form.append("description", description);
        form.append("category", category);

        fetch("/api/createPublication", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.hasErrors) {
                    setErrors(data);
                    setTimeout(() => {
                        setIsSubmitButtonDisabled(false);
                    }, 250);
                } else window.location.reload();
            });
    }

    return (
        <div className="flex flex-col gap-5 w-[700px]">
            <div className="flex gap-16">
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <input
                            className={`w-full font-head font-normal placeholder:text-[#9A9A9A] duration-200 text-lg`}
                            type="text"
                            value={title}
                            onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
                            placeholder="Bez tytułu"
                        />
                        {errors.title && (
                            <div className="flex items-center gap-1">
                                <>
                                    <WarningIcon />
                                    <div className=" text-[#DD0000] font-inter font-normal text-[13px] leading-none">
                                        Niestety, tytuł musi się składać z 2-55 znaków
                                    </div>
                                </>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-12 font-extralight text-[14px]">
                        <div className="text-left flex flex-col gap-5">
                            <div className="flex gap-3 items-center">
                                <TagIcon />
                                <div>Kategoria</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="flex gap-3 items-center">
                                    <ProfileIcon />
                                    <div>Autor</div>
                                </div>
                                {errors.author && <div className="h-[1em]"></div>}
                            </div>
                            <div className="flex gap-3 items-center">
                                <LinkIcon />
                                <div>Zdjęcie</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="relative">
                                <Categories categories={categories} setCategory={setCategory} error={errors.category} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <input
                                    className={`placeholder:text-[#9A9A9A]`}
                                    type="text"
                                    value={author}
                                    onInput={(e) => setAuthor((e.target as HTMLInputElement).value)}
                                    placeholder="wprowadź tutaj..."
                                />
                                {errors.author && (
                                    <div className="flex items-center gap-1">
                                        <>
                                            <WarningIcon />
                                            <div className=" text-[#DD0000] font-inter font-normal text-[13px] leading-none">
                                                Niestety, tytuł musi się składać z 2-55 znaków
                                            </div>
                                        </>
                                    </div>
                                )}
                            </div>
                            <div
                                className={`cursor-pointer overflow-ellipsis overflow-hidden w-[240px]`}
                                onClick={() => imageRef.current?.click()}
                            >
                                {image.file ? image.file.name : "wybierz plik do 10 MB"}
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
                    <hr className="border-black/40" />
                    <div className="font-inter text-xs font-light">
                        Napisz jak się z Tobą skontaktować. <br />
                        Tutaj możesz także dodać dodatkowe informacje.
                    </div>
                    <textarea
                        value={description}
                        onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
                        className="font-inter text-sm resize-none w-full h-36 cursor-auto"
                        placeholder="Zacznij pisać"
                    ></textarea>
                </div>
                <Book data={data} />
            </div>

            {false ? (
                <ContentLoader />
            ) : (
                <div
                    className={`${
                        isSubmitButtonDisabled ? "text-gray-400" : "text-black"
                    } duration-200 cursor-pointer w-fit`}
                    onClick={handleSubmit}
                >
                    Potwierdź
                </div>
            )}
        </div>
    );
}

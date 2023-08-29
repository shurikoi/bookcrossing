import { FormEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Book from "../ui/Book";
import TagIcon from "../ui/icons/TagIcon";
import LinkIcon from "../ui/LinkIcon";
import Categories from "./Categories";
import ProfileIcon from "../ui/icons/ProfileIcon";
import ContentLoader from "../ui/ContentLoader";
import WarningIcon from "../ui/icons/WarningIcon";
import Contact, { messenger } from "../Contact";
import { bookData } from "./Publications";
import isDataValid from "@/lib/isDataValid";

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
    messenger: messenger;
    messengerDescription: string;
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
    messengerDescription: boolean;
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

    const [messenger, setMessenger] = useState<messenger>("Telegram");
    const [messengerDescription, setMessengerDescription] = useState("");

    const bookData: bookData = {
        author,
        title,
        description,
        category,
        image: image.url,
        owner: session?.user.id!,
        messenger,
        messengerDescription,
        date: "Dzisiaj",
    };

    const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(false);

    const imageRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<errors>({
        title: false,
        author: false,
        category: false,
        image: false,
        messengerDescription: false,
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
        form.append("messenger", messenger);
        form.append("messengerDescription", messengerDescription);

        isDataValid({
            ...bookData,
            image: image.file!,
            imageName: image.file?.name!
        });

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
            <div className="flex gap-16 justify-between">
                <div className="flex flex-col gap-5">
                    <div className="relative flex flex-col">
                        <input
                            className={`w-full font-head font-normal placeholder:text-[#9A9A9A] duration-200 text-lg`}
                            type="text"
                            value={title}
                            onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
                            placeholder="Bez tytułu"
                        />
                        {errors.title && (
                            <div className="absolute flex items-center gap-1 -bottom-3">
                                <>
                                    <WarningIcon />
                                    <div className=" text-[#DD0000] font-inter font-normal text-[13px] leading-none">
                                        Niestety, pole musi się składać z 2-55 znaków
                                    </div>
                                </>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-12 font-extralight text-[14px] justify-between">
                        <div className="text-left flex flex-col gap-5">
                            <div className="flex gap-3 items-center">
                                <TagIcon />
                                <div>Kategoria</div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <div className="relative flex gap-3 items-center">
                                    <ProfileIcon />
                                    <div>Autor</div>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <LinkIcon />
                                <div>Zdjęcie</div>
                            </div>
                            <Contact messenger={messenger} setMessenger={setMessenger} />
                        </div>
                        <div className="flex flex-col gap-5">
                            <Categories categories={categories} setCategory={setCategory} error={errors.category} />
                            <div className="relative flex flex-col gap-1">
                                <input
                                    className={`placeholder:text-[#9A9A9A]`}
                                    type="text"
                                    value={author}
                                    onInput={(e) => setAuthor((e.target as HTMLInputElement).value)}
                                    placeholder="wprowadź tutaj..."
                                />
                                {errors.author && (
                                    <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-4">
                                        <>
                                            <WarningIcon />
                                            <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                                                Niestety, pole musi się składać z 2-55 znaków
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
                                accept="image/png, image/jpeg"
                                hidden
                            />
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="wprowadź tutaj..."
                                    onInput={(e) => setMessengerDescription((e.target as HTMLInputElement).value)}
                                />
                                {errors.author && (
                                    <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-4">
                                        <>
                                            <WarningIcon />
                                            <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                                                Niestety, tytuł musi się składać z 2-55 znaków
                                            </div>
                                        </>
                                    </div>
                                )}
                            </div>
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
                <Book data={bookData} />
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

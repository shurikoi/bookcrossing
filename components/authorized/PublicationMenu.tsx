import { Dispatch, FormEvent, SetStateAction, memo, useRef, useState } from "react";
import Book from "../ui/Book";
import TagIcon from "../ui/icons/TagIcon";
import LinkIcon from "../ui/icons/LinkIcon";
import Categories from "./Categories";
import ProfileIcon from "../ui/icons/ProfileIcon";
import ContentLoader from "../ui/ContentLoader";
import WarningIcon from "../ui/icons/WarningIcon";
import Contact, { messenger } from "./Contact";
import isPublicationDataValid from "@/lib/isPublicationDataValid";
import { useUserData } from "../contexts/UserProviders";
import SubmitIcon from "../ui/icons/SubmitIcon";
import { useScreen } from "../contexts/ScreenProvider";
import PreviewMenu from "./PreviewMenu";
import ModalMenu from "../ui/ModalMenu";
import { bookData } from "./Main";

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

interface publicationMenuProps {
    setBooks: Dispatch<SetStateAction<bookData[]>>;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export default memo(function PublicationMenu({ setBooks, isModalActive, setIsModalActive }: publicationMenuProps) {
    const { user } = useUserData();

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
        owner: user!.id,
        messenger,
        messengerDescription,
        date: "Dzisiaj",
    };

    const [isLoading, setIsLoading] = useState(false);
    const [isPreviewMenuActive, setIsPreviewMenuActive] = useState(false);

    const { isSmallScreen } = useScreen();

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
        if (isLoading) return;

        if (!isPreviewMenuActive && isSmallScreen) {
            setIsPreviewMenuActive(true);
            return;
        }

        setIsLoading(true);

        setErrors({
            title: false,
            author: false,
            category: false,
            image: false,
            messengerDescription: false,
            hasErrors: false,
        });

        const errors = isPublicationDataValid({
            ...bookData,
            image: image.file!,
            imageName: image.file?.name!,
        });

        if (errors.hasErrors) {
            setTimeout(() => {
                setIsLoading(false);
                setErrors(errors);
            }, 250);

            return;
        }

        const form = new FormData();

        form.append("image", image.file!);
        form.append("imageName", image.file?.name!);
        form.append("author", author);
        form.append("owner", user!.id);
        form.append("title", title);
        form.append("description", description);
        form.append("category", category);
        form.append("messenger", messenger);
        form.append("messengerDescription", messengerDescription);

        fetch("/api/createPublication", {
            method: "POST",
            body: form,
        })
            .then((res) => res.json())
            .then((data) => {
                setBooks((prev) => [bookData, ...prev]);
                setIsLoading(false);
                setIsModalActive(false);

                setAuthor("");
                setTitle("");
                setDescription("");
                setCategory("");
                setMessengerDescription("");
                setImage({
                    url: "",
                    file: undefined,
                });
                setMessenger("Telegram");
            });
    }

    return (
        <ModalMenu fullMode isModalActive={isModalActive} setIsModalActive={setIsModalActive}>
            <div className="flex flex-col md:gap-5 h-full  justify-between md:min-h-[500px] md:min-w-[640px] lg:min-w-[820px] md:p-6">
                <div className="flex justify-between md:gap-4">
                    <div className="flex flex-col gap-5 w-full">
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
                        <div className="flex gap-12 font-extralight text-[14px] justify-start">
                            <div className="text-left flex flex-col gap-5">
                                <div className="flex gap-3 items-center">
                                    <TagIcon />
                                    <div>Kategoria</div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="relative flex gap-3 items-center">
                                        <ProfileIcon />
                                        <div>Autor</div>
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
                                </div>
                                <div className="flex gap-3 items-center">
                                    <LinkIcon />
                                    <div>Zdjęcie</div>
                                </div>
                                <Contact messenger={messenger} setMessenger={setMessenger} />
                            </div>
                            <div className="flex flex-col gap-5">
                                <Categories
                                    categories={categories}
                                    category={category}
                                    setCategory={setCategory}
                                    error={errors.category}
                                />
                                <input
                                    className={`placeholder:text-[#9A9A9A]`}
                                    type="text"
                                    value={author}
                                    onInput={(e) => setAuthor((e.target as HTMLInputElement).value)}
                                    placeholder="wprowadź tutaj..."
                                />
                                <div
                                    className={`${
                                        errors.image ? "text-[#DD0000]" : "text-inherit"
                                    } cursor-pointer overflow-ellipsis overflow-hidden whitespace-nowrap`}
                                    onClick={() => imageRef.current?.click()}
                                >
                                    {image.file ? "Załączono" : "wybierz plik do 10 MB"}
                                </div>
                                <input
                                    ref={imageRef}
                                    type="file"
                                    onInput={handleInputFile}
                                    placeholder="wybierz..."
                                    accept="image/png, image/jpeg"
                                    hidden
                                />
                                <input
                                    className={`${
                                        errors.messengerDescription
                                            ? "placeholder:text-[#DD0000]"
                                            : "placeholder:text-[#9A9A9A]"
                                    }`}
                                    type="text"
                                    placeholder="wprowadź tutaj..."
                                    onInput={(e) => setMessengerDescription((e.target as HTMLInputElement).value)}
                                />
                            </div>
                        </div>
                        <hr className="border-black/40" />
                        <div className="font-inter text-xs font-light">Tutaj napiszesz dodatkowe informacje</div>
                        <textarea
                            value={description}
                            onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
                            className="font-inter text-sm resize-none w-full h-36 cursor-auto"
                            placeholder="Zacznij pisać"
                        ></textarea>
                    </div>
                    <div className="hidden md:block">
                        <Book
                            data={bookData}
                            handleClick={() => {
                                imageRef.current?.click();
                            }}
                        />
                    </div>
                </div>

                <div className="flex justify-center md:justify-start">
                    {isLoading ? (
                        <div className="relative w-[33px] h-[33px]">
                            <ContentLoader />
                        </div>
                    ) : (
                        <div
                            className={`${
                                isLoading ? "text-gray-400" : "text-black"
                            } duration-200 cursor-pointer w-fit`}
                            onClick={handleSubmit}
                        >
                            <SubmitIcon></SubmitIcon>
                        </div>
                    )}
                </div>
                {isSmallScreen && (
                    <PreviewMenu
                        previewData={bookData}
                        handleSubmit={handleSubmit}
                        isLoading={isLoading}
                        isMenuActive={isPreviewMenuActive}
                        setIsMenuActive={setIsPreviewMenuActive}
                    ></PreviewMenu>
                )}
            </div>
        </ModalMenu>
    );
});

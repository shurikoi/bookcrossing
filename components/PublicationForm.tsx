import { FormEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Book from "./ui/Book";
import TagIcon from "./ui/TagIcon";
import LinkIcon from "./ui/LinkIcon";
import Categories from "./Categories";
import ProfileIcon from "./ui/ProfileIcon";
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
    const { data: session } = useSession();

    const [bookData, setBookData] = useState<publicationData>({
        description: "",
        author: "",
        title: "",
        category: "",
        image: {
            name: "wybierz...",
            url: "",
        },
    });

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
            setBookData({
                ...bookData,
                image: {
                    name: files[0].name,
                    url: URL.createObjectURL(files[0]),
                    file: files[0],
                },
            });
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
                        value={bookData.title}
                        onInput={(e) => setBookData({ ...bookData, title: (e.target as HTMLInputElement).value })}
                        placeholder="Bez tytułu"
                    />
                    <div className="flex gap-12 font-extralight text-[14px]">
                        <div className="text-left flex flex-col gap-5">
                            <div className="flex gap-3 items-center">
                                <TagIcon />
                                <div>Kategoria</div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <ProfileIcon />
                                <div>Autor</div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <LinkIcon />
                                <div>Zdjęcie</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="relative">
                                <Categories categories={categories} setBookData={setBookData} error={errors.title} />
                            </div>
                            <input
                                className={`placeholder:text-[#9A9A9A] border-b ${
                                    errors.title ? "border-b-red-400" : "border-b-black/40"
                                }`}
                                type="text"
                                value={bookData.author}
                                onInput={(e) =>
                                    setBookData({ ...bookData, author: (e.target as HTMLInputElement).value })
                                }
                                placeholder="wprowadź tutaj..."
                            />
                            <div
                                className={`${
                                    bookData.image.name == "wybierz..." && errors.image
                                        ? "text-red-400"
                                        : "text-[#9A9A9A]"
                                } cursor-pointer`}
                                onClick={() => imageRef.current?.click()}
                            >
                                {bookData.image.name}
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
                <Book author={bookData.author} title={bookData.title} date="Dzisiaj" image={bookData.image.url} />
            </div>

            <textarea
                value={bookData.description}
                onInput={(e) => setBookData({ ...bookData, description: (e.target as HTMLTextAreaElement).value })}
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

                        // const errors = isDataValid(bookData);

                        // setErrors(errors);

                        // if (errors.hasErrors) {
                        //     setTimeout(() => {
                        //         setIsSubmitButtonDisabled(false);
                        //     }, 250);
                        //     return;
                        // }

                        const form = new FormData();

                        form.append(
                            "image",
                            JSON.stringify({
                                file: bookData.image.file!,
                                name: bookData.image.name,
                            })
                        );
                        form.append("author", bookData.author);
                        form.append("owner", session!.user._id!);
                        form.append("title", bookData.title);
                        form.append("description", bookData.description);
                        form.append("category", bookData.category);

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
                    }}
                >
                    Potwierdź
                </div>
            )}
        </div>
    );
}

import { useBook } from "@/components/contexts/BookProvider";
import { useUserData } from "@/components/contexts/UserProvider";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";
import isPublicationDataValid, { errors } from "@/lib/isPublicationDataValid";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import PublicationImage from "../publication_menu/PublicationImage";
import { BookMenuMode } from "./BookMenu";
import SmallPhotosIcon from "@/components/ui/icons/SmallPhotosIcon";
import DropDownMenuWithSearch from "@/components/ui/DropDownMenuWithSearch";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import { bookStates, categories, languages } from "../publication_menu/StepTwo";
import TagIcon from "@/components/ui/icons/TagIcon";
import LanguageIcon from "@/components/ui/icons/LanguageIcon";
import LeafIcon from "@/components/ui/icons/LeafIcon";
import DropDownMenuWithChoose from "@/components/ui/DropDownMenuWithChoose";
import { messengers } from "../publication_menu/PublicationMenu";
import Button from "@/components/ui/buttons/Button";
import toast from "react-hot-toast";
import { bookData } from "../Main";
import PencilIcon from "@/components/ui/icons/PencilIcon";
import useImagePicker from "@/components/hooks/useImagePicker";
import { allowedImageTypes } from "@/lib/variables";
import getExtension from "@/lib/getExtension";

interface EditModeProps {
    setMode: Dispatch<SetStateAction<BookMenuMode>>;
}

const descriptionLength = 1000;

export default function EditMode({ setMode }: EditModeProps) {
    const { user } = useUserData();
    const { bookId, book, setBook, setBooks } = useBook();

    const [title, setTitle] = useState(book?.title || "");
    const [author, setAuthor] = useState(book?.author || "");
    const [bookCategory, setBookCategory] = useState(book?.category || "");
    const [bookLanguage, setBookLanguage] = useState(book?.language || "");
    const [bookState, setBookState] = useState(book?.state || "");
    const [bookDescription, setBookDescription] = useState(book?.description || "");
    const [messenger, setMessenger] = useState(book?.messenger || "");
    const [messengerDescription, setMessengerDescription] = useState(book?.messengerDescription || "");

    const [file, setFile] = useState<File>();
    const [image, setImage] = useState(book?.image || "");

    const [errors, setErrors] = useState<errors>();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    const newData = {
        title,
        author,
        description: bookDescription,
        category: bookCategory,
        language: bookLanguage,
        state: bookState,
        messenger,
        messengerDescription,
        date: book?.date || new Date(),
    };

    function openFileMenu() {
        if (fileRef.current) fileRef.current.click();
    }

    useImagePicker(fileRef, (e) => {
        e.preventDefault();

        const files = e.target.files;

        if (files[0]) {
            const extension = getExtension(files[0].name);

            if (extension && allowedImageTypes.includes(extension.toLowerCase())) {
                setFile(files[0]);
                setImage(URL.createObjectURL(files[0]));
            } else {
                toast.error("Wybierz format .png lub .jpeg");
            }
        }
    });

    function handleSubmit() {
        if (isLoading) return;

        if (book) {
            const errors = isPublicationDataValid({
                ...newData,
                image: book.image,
            });

            if (errors.hasErrors) setErrors(errors);
            else saveChanges();
        }
    }

    function saveChanges() {
        if (book) {
            const newBook: bookData = {
                ...book,
                ...newData,
                image: image || "",
            };

            if (JSON.stringify(newBook) == JSON.stringify(book)) {
                setMode("view");
                toast.success("Dane zostały takie same");
                return;
            }
        }

        async function updatePublication() {
            return await new Promise(async (resolve, reject) => {
                setIsLoading(true);
                const reader = new FileReader();

                if (file) reader.readAsDataURL(file);
                else {
                    try {
                        const response = await fetch("/api/update-publication", {
                            method: "post",
                            body: JSON.stringify({
                                id: bookId,
                                ...newData,
                            }),
                        });

                        if (!response.ok) throw new Error();

                        setMode("view");

                        setBook((book) => {
                            if (book)
                                return {
                                    ...book,
                                    ...newData,
                                };
                        });

                        resolve(1);
                    } catch (error) {
                        reject();
                    }
                }

                reader.onload = async (e) => {
                    try {
                        const response = await fetch("/api/update-publication", {
                            method: "post",
                            body: JSON.stringify({
                                id: bookId,
                                ...newData,
                                image: e.target?.result,
                            }),
                        });

                        if (!response.ok) throw new Error();

                        setMode("view");

                        setBook((book) => {
                            if (book)
                                return {
                                    ...book,
                                    ...newData,
                                    image,
                                };
                        });

                        setBooks((books) => {
                            const updatedBook = books.find((book) => book.id == bookId);

                            if (updatedBook?.image) updatedBook.image = image;

                            return books;
                        });

                        resolve(1);
                    } catch (error) {
                        reject();
                    }
                    
                };
                
                setIsLoading(false);
            });
        }

        toast.promise(updatePublication(), {
            error: "Nie udało się zaktualizować dane",
            loading: "Aktualizujemy dane...",
            success: "Dane zostały zaktualizowane",
        });
    }

    useEffect(() => {
        const textarea = textareaRef.current;

        if (textarea) textarea.style.height = textarea.scrollHeight + "px";
    }, []);

    return (
        <div className="flex flex-col h-full md:max-h-[610px]">
            <div className="flex flex-col md:flex-row h-full">
                <div className="flex w-full md:w-[400px] aspect-[3/4] relative shrink-0">
                    <PublicationImage image={image}></PublicationImage>
                    <div
                        className="flex items-center justify-center cursor-pointer bg-black/40 gap-2.5 text-white w-full h-full absolute top-0 left-0"
                        onClick={openFileMenu}
                    >
                        <input ref={fileRef} type="file" accept="image/png, image/jpeg" hidden />
                        <PencilIcon color="white"></PencilIcon>
                        <div>Zmień zdjęcie</div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 p-4 w-full md:w-[360px]">
                    <div className="flex gap-4 items-center">
                        <img className="w-10 h-10 rounded-full" src={user?.avatar} alt="" />
                        <div className="font-extralight text-base">{user?.name}</div>
                    </div>

                    <div className="flex flex-col gap-4 text-[20px] font-lato font-normal md:h-[380px] md:overflow-y-auto flex-grow flex-shrink">
                        <div className="flex items-center justify-between px-1">
                            <input
                                className={`duration-200 ${
                                    errors?.title
                                        ? "text-red-600 placeholder:text-red-600"
                                        : "text-black placeholder:text-[#6C6C6C]"
                                }`}
                                placeholder="Tytuł"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value.replace(/\s+/g, " "))}
                            />
                            <SmallPhotosIcon></SmallPhotosIcon>
                        </div>
                        <div className="flex items-center justify-between px-1">
                            <input
                                className={`duration-200 ${
                                    errors?.author
                                        ? "text-red-600 placeholder:text-red-600"
                                        : "text-black placeholder:text-[#6C6C6C]"
                                }`}
                                placeholder="Autor"
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value.replace(/\s+/g, " "))}
                            />
                            <ProfileIcon height={24} width={24}></ProfileIcon>
                        </div>
                        <div className="flex items-center justify-between px-1">
                            <DropDownMenuWithSearch
                                items={categories}
                                startValue={bookCategory}
                                setItem={setBookCategory}
                                placeholder="Kategoria"
                                inputClassName={`duration-200 ${
                                    errors?.category
                                        ? "text-red-600 placeholder:text-red-600"
                                        : "text-black placeholder:text-[#6C6C6C]"
                                }`}
                                createNewItem
                            ></DropDownMenuWithSearch>
                            <TagIcon height={24} width={24}></TagIcon>
                        </div>
                        <div className="flex items-center justify-between px-1">
                            <DropDownMenuWithSearch
                                items={languages}
                                startValue={bookLanguage}
                                setItem={setBookLanguage}
                                placeholder="Język"
                                inputClassName={`duration-200 ${
                                    errors?.language
                                        ? "text-red-600 placeholder:text-red-600"
                                        : "text-black placeholder:text-[#6C6C6C]"
                                }`}
                                createNewItem
                            ></DropDownMenuWithSearch>
                            <LanguageIcon height={24} width={24}></LanguageIcon>
                        </div>
                        <div className="flex items-center justify-between px-1">
                            <DropDownMenuWithSearch
                                items={bookStates}
                                startValue={bookState}
                                setItem={setBookState}
                                placeholder="Stan"
                                inputClassName={`duration-200 ${
                                    errors?.state
                                        ? "text-red-600 placeholder:text-red-600"
                                        : "text-black placeholder:text-[#6C6C6C]"
                                }`}
                            ></DropDownMenuWithSearch>
                            <LeafIcon height={24} width={24}></LeafIcon>
                        </div>
                        <div className="flex items-center justify-between px-1">
                            <input
                                type="text"
                                placeholder="Kontakt"
                                value={messengerDescription}
                                onChange={(e) => setMessengerDescription(e.target.value.replace(/\s+/g, " "))}
                                className={`duration-200 ${
                                    errors?.messengerDescription
                                        ? "text-red-600 placeholder:text-red-600"
                                        : "text-black placeholder:text-[#6C6C6C]"
                                }`}
                            />

                            <DropDownMenuWithChoose
                                mode="icons"
                                items={messengers}
                                setItem={setMessenger}
                                item={messenger}
                            ></DropDownMenuWithChoose>
                        </div>
                        <div className="relative px-1">
                            <textarea
                                className="resize-none w-full placeholder:text-[#6C6C6C]"
                                value={bookDescription}
                                placeholder="Napisz komentarz"
                                maxLength={descriptionLength}
                                ref={textareaRef}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    e.target.style.height = 0 + "px";

                                    e.target.style.height = e.target.scrollHeight + "px";

                                    if (value.length > descriptionLength) value.slice(descriptionLength);
                                    setBookDescription(value);
                                }}
                            ></textarea>
                            <div className="absolute right-0 bottom-0 select-none text-sm text-[#767676] translate-y-1/2">
                                {bookDescription.length}/{descriptionLength}
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <Button
                            className={`${isLoading ? "opacity-50 cursor-default" : "opacity-100"}`}
                            onClick={handleSubmit}
                        >
                            Zapisz
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

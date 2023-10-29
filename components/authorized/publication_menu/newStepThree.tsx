import { useUserData } from "@/components/contexts/UserProvider";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";
import PublicationField from "../../ui/PublicationField";
import { image, messengers, publicationData } from "./PublicationMenu";
import TagIcon from "@/components/ui/icons/TagIcon";
import LanguageIcon from "@/components/ui/icons/LanguageIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import LeafIcon from "@/components/ui/icons/LeafIcon";
import Button from "@/components/ui/buttons/Button";
import { Dispatch, SetStateAction, useState } from "react";
import ContentLoader from "@/components/ui/ContentLoader";
import { useFilter } from "@/components/contexts/FilterProvider";
import { useBook } from "@/components/contexts/BookProvider";
import { publication } from "../Main";
import toast from "react-hot-toast";

interface StepThreeProps {
    image: image;
    file: File | undefined;
    setFile: Dispatch<SetStateAction<File | undefined>>;
    publicationData: publicationData | undefined;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    setBooks: Dispatch<SetStateAction<publication[]>>;
    setPublicationData: Dispatch<SetStateAction<publicationData | undefined>>;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function StepThree({
    image,
    file,
    setFile,
    publicationData,
    setBooks,
    setPublicationData,
    setIsModalActive,
    setCurrentStep,
}: StepThreeProps) {
    const { user } = useUserData();

    const [isLoading, setIsLoading] = useState(false);

    const filter = useFilter();
    const { setFetchedBooks } = useBook();

    function handleSubmit() {
        setIsLoading(true);
        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                if (e.target) {
                    try {
                        const response = await fetch("/api/create-publication", {
                            method: "POST",
                            body: JSON.stringify({
                                ...publicationData,
                                imageData: e.target.result,
                            }),
                        });

                        const data = await response.json();

                        setFetchedBooks((fetchedBooks) => {
                            return {
                                [data.id]: {
                                    ...publicationData,
                                    owner: user?.id,
                                    image: data.image,
                                    ownerData: {
                                        avatar: user?.avatar,
                                        name: user?.name,
                                        surname: user?.surname,
                                    },
                                },
                                ...fetchedBooks,
                            };
                        });

                        if (filter.choosenSort == "desc")
                            setBooks((books) => {
                                return [
                                    {
                                        id: data.id as string,
                                        title: publicationData?.title || "",
                                        author: publicationData?.author || "",
                                        date: publicationData?.date || new Date(),
                                        image: data.image,
                                        ownerData: {
                                            avatar: user?.avatar || "",
                                            name: user?.name || "",
                                            surname: user?.surname || "",
                                        },
                                    },
                                    ...books,
                                ];
                            });
                        setPublicationData(undefined);
                        setIsModalActive(false);
                        setFile(undefined);
                        setCurrentStep(0);
                    } catch (error) {
                        toast.error("Coś poszło nie tak");
                    }
                    setIsLoading(false);
                }
            };

            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <div className="flex flex-col w-full md:min-w-[700px] min-h-[400px] gap-4 md:p-6 h-fit pb-10 px-14">
                {isLoading ? (
                    <ContentLoader></ContentLoader>
                ) : book ? (
                    <>
                        {book.reservatorData && book?.owner == user?.id && (
                            <div className="flex flex-col gap-2 bg-[#EDFFE4] rounded-md p-3.5 text-[15px] font-inter">
                                <div>
                                    <span className="border-b border-b-black/80 cursor-pointer font-normal">
                                        {book?.reservatorData?.name} {book?.reservatorData?.surname}
                                    </span>
                                    <span className="font-light">
                                        {" "}
                                        chce Twoją książkę. Kiedy potwierdzisz wymianę dostaniesz 1 punkt.
                                    </span>
                                </div>
                                <div className="flex justify-start items-center gap-2">
                                    <div className="p-1.5 px-4 rounded-full bg-[#61C558] text-white font-normal cursor-pointer">
                                        Potwierdź wymianę
                                    </div>
                                    <div className="p-1 px-4 rounded-full border-[#61C558] border-2 box-border text-[#61C558] font-normal cursor-pointer">
                                        Anuluj
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="flex flex-col gap-10 shrink-0 md:w-[200px]">
                                <div className="relative shrink-0">
                                    <div
                                        className="relative w-full aspect-[3/4]"
                                        onMouseEnter={() => setIsImageHovered(true)}
                                        onMouseLeave={() => setIsImageHovered(false)}
                                    >
                                        {isImageLoaded ? (
                                            <>
                                                <Image
                                                    quality={100}
                                                    fill={true}
                                                    src={book.image}
                                                    alt=""
                                                    className={`md:rounded-md object-cover`}
                                                    onLoad={() => {
                                                        setIsImageLoaded(true);
                                                    }}
                                                    onError={() => {
                                                        setIsImageLoaded(false);
                                                    }}
                                                />
                                            </>
                                        ) : (
                                            !isImageLoaded && (
                                                <div className="bg-black text-white flex items-center h-full justify-center rounded-md">
                                                    Nie ma zdjęcia
                                                </div>
                                            )
                                        )}
                                    </div>
                                    <Image
                                        quality={100}
                                        height={56}
                                        width={56}
                                        alt=""
                                        title={book.ownerData.name + " " + book.ownerData.surname}
                                        src={book?.ownerData.avatar}
                                        className={`absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full bg-gray-500 cursor-pointer duration-200 ${
                                            isImageHovered ? "opacity-0" : "opacity-100"
                                        }`}
                                    ></Image>
                                </div>
                                {!isSmallScreen && <Buttons setMode={setMode}></Buttons>}
                            </div>
                            <div className="flex flex-col gap-8 items-center text-center md:items-start md:text-left">
                                <div className="font-head font-normal text-[20px]">{book.title}</div>
                                <div className="grid grid-cols-[repeat(2,auto)] grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 w-fit pr-10">
                                    <PublicationField
                                        data={book.author}
                                        icon={<ProfileIcon />}
                                        title="Autor"
                                        bg="bg-[#a4e94d7a]"
                                    ></PublicationField>

                                    <PublicationField
                                        data={book.state}
                                        icon={<LeafIcon />}
                                        title="Stan"
                                        bg="bg-[#4d66e97a]"
                                    ></PublicationField>

                                    <PublicationField
                                        data={book.category}
                                        icon={<TagIcon />}
                                        title="Kategoria"
                                        bg="bg-[#e9d04d7a]"
                                    ></PublicationField>

                                    <PublicationField
                                        data={book.language}
                                        icon={<LanguageIcon />}
                                        title="Język"
                                        bg="bg-[#e97c4d7a]"
                                    ></PublicationField>
                                </div>
                                <div className="text-[#474747] font-light font-inter text-[15px] md:w-[500px] max-h-[180px] overflow-y-auto break-words">
                                    {book.description}
                                </div>
                            </div>
                            {isSmallScreen && <Buttons setMode={setMode}></Buttons>}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center w-full gap-6">
                        <div className="text-2xl">Takiej książki nie ma</div>
                        <div className="w-3/4 h-3/4">
                            <NotFoundIcon></NotFoundIcon>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

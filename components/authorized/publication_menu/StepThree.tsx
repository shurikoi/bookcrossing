import { useUserData } from "@/components/contexts/UserProvider";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";
import PublicationItem from "../../ui/PublicationItem";
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
        <div className="flex flex-col">
            <div className="p-3 relative text-center border-b">
                <div className="absolute cursor-pointer w-fit" onClick={() => setCurrentStep((step) => step - 1)}>
                    <ArrowLeftIcon></ArrowLeftIcon>
                </div>
                <div>Podgląd</div>
            </div>
            <div className="flex min-w-[700px] min-h-[400px] w-fit gap-10 md:p-6 h-fit">
                <div className="flex flex-col gap-10 shrink-0 w-[200px]">
                    <div className="relative aspect-[3/4]">
                        <img
                            src={publicationData?.imageData}
                            alt="book"
                            className="rounded-md w-full h-full object-cover"
                        />
                        <img
                            src={user?.avatar}
                            className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gray-500"
                        ></img>
                    </div>
                    <Button
                        className="text-center"
                        onClick={() => {
                            if (!isLoading) handleSubmit();
                        }}
                    >
                        {isLoading ? (
                            <div className="h-[1em]">
                                <ContentLoader></ContentLoader>
                            </div>
                        ) : (
                            "Publikuj"
                        )}
                    </Button>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="font-head font-normal text-[20px]">{publicationData?.title}</div>
                    <div className="grid grid-cols-[repeat(2,auto)] grid-rows-2 font-extralight leading-none text-[14px] gap-y-8 gap-x-16 w-fit">
                        <PublicationItem
                            data={publicationData?.author}
                            icon={<ProfileIcon />}
                            title="Autor"
                            bg="bg-[#a4e94d7a]"
                        ></PublicationItem>

                        <PublicationItem
                            data={publicationData?.state}
                            icon={<LeafIcon />}
                            title="Stan"
                            bg="bg-[#4d66e97a]"
                        ></PublicationItem>

                        {/* <PublicationItem
                            data={publicationData?.messengerDescription}
                            icon={
                                <div className="w-[15px] h-[15px]">
                                    {messengers[publicationData?.messenger || "Telegram"].icon}
                                </div>
                            }
                            title={publicationData?.messenger}
                            bg="bg-[#4d9ee9d9]"
                        ></PublicationItem> */}

                        <PublicationItem
                            data={publicationData?.category}
                            icon={<TagIcon />}
                            title="Kategoria"
                            bg="bg-[#e9d04d7a]"
                        ></PublicationItem>

                        <PublicationItem
                            data={publicationData?.language}
                            icon={<LanguageIcon />}
                            title="Język"
                            bg="bg-[#e97c4d7a]"
                        ></PublicationItem>
                    </div>
                    <div className="text-[#474747] font-light font-inter text-[15px] w-[500px] max-h-[138px] overflow-y-auto break-words">
                        {publicationData?.description}
                    </div>
                </div>
            </div>
        </div>
    );
}

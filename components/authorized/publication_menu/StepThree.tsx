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
import ContentLoader from "@/components/ui/loaders/ContentLoader";
import { useFilter } from "@/components/contexts/FilterProvider";
import { useBook } from "@/components/contexts/BookProvider";
import { publication } from "../Main";
import toast from "react-hot-toast";
import { useScreen } from "@/components/contexts/ScreenProvider";

interface StepThreeProps {
    image: image;
    file: File | undefined;
    setFile: Dispatch<SetStateAction<File | undefined>>;
    publicationData: publicationData | undefined;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    setPublicationData: Dispatch<SetStateAction<publicationData | undefined>>;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function StepThree({
    image,
    file,
    setFile,
    publicationData,
    setPublicationData,
    setIsModalActive,
    setCurrentStep,
}: StepThreeProps) {
    const { user } = useUserData();

    const [isLoading, setIsLoading] = useState(false);

    const { isSmallScreen } = useScreen();
    const { setFetchedBooks } = useBook();
    const { setBooks } = useBook();

    const filter = useFilter();

    function handleSubmit() {
        setIsLoading(true);
        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const submitPromise = new Promise(async (resolve, reject) => {
                    if (e.target) {
                        try {
                            const response = await fetch("/api/create-publication", {
                                method: "POST",
                                body: JSON.stringify({
                                    ...publicationData,
                                    image: e.target.result,
                                }),
                            });

                            if (!response.ok) throw new Error();

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
                                            isReserved: false,
                                            ownerData: {
                                                avatar: user?.avatar || "",
                                                name: user?.name || "",
                                                surname: user?.surname || "",
                                            },
                                        },
                                        ...books,
                                    ]
                                        .sort((a, b) => {
                                            if (filter.choosenSort == "desc")
                                                return Number(new Date(b.date)) - Number(new Date(a.date));

                                            return Number(new Date(a.date)) - Number(new Date(b.date));
                                        })
                                        .sort((a, b) => {
                                            return Number(!!b.isReserved) - Number(!!a.isReserved);
                                        });
                                });

                            setPublicationData(undefined);
                            setIsModalActive(false);
                            setFile(undefined);
                            setCurrentStep(0);

                            if (image?.data) URL.revokeObjectURL(image.data);

                            resolve(1);
                        } catch (error) {
                            reject();
                        }

                        setIsLoading(false);
                    }
                });

                toast.promise(submitPromise, {
                    error: "Nie udało się opublikować książkę",
                    loading: "Publikujemy książkę...",
                    success: "Książka została opublikowana",
                });
            };

            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="flex flex-col">
            <div className="hidden md:block p-3 relative text-center border-b">
                <div className="absolute cursor-pointer w-fit" onClick={() => setCurrentStep((step) => step - 1)}>
                    <ArrowLeftIcon></ArrowLeftIcon>
                </div>
                <div>Podgląd</div>
            </div>
            <div className="flex flex-col md:flex-row w-full md:min-w-[700px] min-h-[400px] gap-10 md:p-6 h-fit">
                <div className="flex flex-col gap-10 shrink-0 md:w-[200px]">
                    <div className="relative aspect-[3/4]">
                        <img src={publicationData?.image} alt="book" className="w-full h-full object-cover" />
                        <img
                            src={user?.avatar}
                            className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gray-500"
                        ></img>
                    </div>
                    {!isSmallScreen && (
                        <Button
                            className={`text-center w-full md:w-auto ${
                                isLoading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"
                            }`}
                            onClick={() => {
                                if (!isLoading) handleSubmit();
                            }}
                        >
                            Publikuj
                        </Button>
                    )}
                </div>
                <div className="flex flex-col gap-8 items-center text-center md:items-start md:text-left pb-10 px-14 md:p-0">
                    <div className="font-head font-normal text-[20px]">{publicationData?.title}</div>
                    <div className="grid grid-cols-[repeat(2,auto)] grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 w-fit md:pr-10">
                        <PublicationField
                            data={publicationData?.author}
                            icon={<ProfileIcon />}
                            title="Autor"
                            bg="bg-[#a4e94d7a]"
                        ></PublicationField>

                        <PublicationField
                            data={publicationData?.state}
                            icon={<LeafIcon />}
                            title="Stan"
                            bg="bg-[#4d66e97a]"
                        ></PublicationField>

                        {/* <PublicationField
                            data={publicationData?.messengerDescription}
                            icon={
                                <div className="w-[15px] h-[15px]">
                                    {messengers[publicationData?.messenger || "Telegram"].icon}
                                </div>
                            }
                            title={publicationData?.messenger}
                            bg="bg-[#4d9ee9d9]"
                        ></PublicationField> */}

                        <PublicationField
                            data={publicationData?.category}
                            icon={<TagIcon />}
                            title="Kategoria"
                            bg="bg-[#e9d04d7a]"
                        ></PublicationField>

                        <PublicationField
                            data={publicationData?.language}
                            icon={<LanguageIcon />}
                            title="Język"
                            bg="bg-[#e97c4d7a]"
                        ></PublicationField>
                    </div>
                    <div className="text-[#474747] font-light font-inter text-[15px] md:w-[500px] max-h-[180px] overflow-y-auto break-all">
                        {publicationData?.description}
                    </div>
                    {isSmallScreen && (
                        <Button
                            className={`text-center w-full md:w-auto ${
                                isLoading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"
                            }`}
                            onClick={() => {
                                if (!isLoading) handleSubmit();
                            }}
                        >
                            Publikuj
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

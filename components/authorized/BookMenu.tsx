import { messengers } from "./Contact";

import Book from "../ui/Book";
import ProfileIcon from "../ui/icons/ProfileIcon";
import TagIcon from "../ui/icons/TagIcon";
import ModalMenu from "../ui/ModalMenu";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { bookData } from "./Main";
import LanguageIcon from "../ui/icons/LanguageIcon";
import LeafIcon from "../ui/icons/LeafIcon";
import { useUserData } from "../contexts/UserProviders";

interface BookMenuProps {
    data: bookData;
    isBookModalActive: boolean;
    setIsBookModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function BookMenu({ data, isBookModalActive, setIsBookModalActive }: BookMenuProps) {
    const { title, image, author, owner, category, description, messengerDescription, messenger } = data;

    const [isContactVisible, setIsContactVisible] = useState(false);

    function handleContactClick() {
        if (!isContactVisible) setIsContactVisible(true);
    }

    useEffect(() => {
        setIsContactVisible(false);
    }, [isBookModalActive]);

    const { user } = useUserData();

    return (
        <ModalMenu fullMode isModalActive={isBookModalActive} setIsModalActive={setIsBookModalActive}>
            <div className="flex md:w-[640px] lg:w-[800px] gap-10 md:p-6">
                <div className="flex flex-col gap-2.5 shrink-0 w-[200px]">
                    <img src={image} alt="book" className="rounded-md " />
                    {owner != user?.id ? (
                        <>
                            <div className="font-inter font-medium py-1.5 border-2 text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer hover:text-white hover:bg-[#2B78B1] duration-300">
                                Edytuj
                            </div>
                            <div className="font-inter font-medium py-1.5 text-center border-2 border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer hover:text-[#CD5E4F] hover:bg-white hover:border-[#CD5E4F] duration-300">
                                Usuń
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="font-inter font-medium py-2 px-2 border-2 hover:border-[3px] box-content text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer duration-300"
                                onClick={handleContactClick}
                            >
                                {isContactVisible ? (
                                    <div
                                        className="flex gap-2 items-center justify-center"
                                        title={messenger + " : " + messengerDescription}
                                    >
                                        <div>{messengers[messenger].icon}</div>
                                        <div className="text-ellipsis  overflow-hidden">{messengerDescription}</div>
                                    </div>
                                ) : (
                                    "Pokaż kontakt"
                                )}
                            </div>
                            <div className="font-inter font-medium py-2 text-center border-2 border-transparent bg-[#4F98CD] text-white rounded-lg cursor-pointer hover:text-[#4F98CD] hover:bg-white hover:border-[#4F98CD] duration-300">
                                Zarezerwuj książkę
                            </div>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-8">
                    <div className="font-head font-normal text-[20px]">{title}</div>
                    <div className="grid grid-cols-2 grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 w-fit">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <ProfileIcon></ProfileIcon>
                                <div className="text-[#4E4E4E]">Autor</div>
                            </div>
                            <div className="py-2 px-3 w-fit bg-[#a4e94d7a] rounded-sm">{author}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <LeafIcon></LeafIcon>
                                <div className="text-[#4E4E4E]">Stan</div>
                            </div>
                            <div className="py-2 px-3 w-fit bg-[#4d66e97a] rounded-sm">Akceptowany</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <ProfileIcon></ProfileIcon>
                                <div className="text-[#4E4E4E]">Kategoria</div>
                            </div>
                            <div className="py-2 px-3 w-fit bg-[#e9d04d7a] rounded-sm">{category}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <LanguageIcon></LanguageIcon>
                                <div className="text-[#4E4E4E]">Język</div>
                            </div>
                            <div className="py-2 px-3 w-fit bg-[#e97c4d7a] rounded-sm">Polski</div>
                        </div>
                    </div>
                    <div className="text-[#474747] font-light font-inter text-[15px]">{description}</div>
                </div>
            </div>
        </ModalMenu>
    );
}

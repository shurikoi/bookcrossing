import ProfileIcon from "../ui/icons/ProfileIcon";
import TagIcon from "../ui/icons/TagIcon";
import ModalMenu from "../ui/ModalMenu";
import { useEffect, useState } from "react";
import LanguageIcon from "../ui/icons/LanguageIcon";
import LeafIcon from "../ui/icons/LeafIcon";
import { useUserData } from "../contexts/UserProvider";
import { useBook } from "../contexts/BookProvider";
import ContentLoader from "../ui/ContentLoader";
import NotFoundIcon from "../ui/icons/NotFoundIcon";
import { bookData } from "./Main";
import { messengers } from "./PublicationMenu";
import Button from "../ui/buttons/Button";
import PublicationItem from "./PublicationItem";

export default function BookMenu() {
    const { user } = useUserData();
    const { book, bookId, isLoading, setBookId } = useBook();

    const [isModalActive, setIsModalActive] = useState(false);
    const [wasButtonPressed, setWasButtonPresseed] = useState(false);

    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    function handleContactClick() {
        if (!wasButtonPressed) setWasButtonPresseed(true);
    }

    useEffect(() => {
        if (isModalActive) {
            setWasButtonPresseed(false);
            setIsImageLoaded(false);
            setIsImageLoading(true);
        }
    }, [isModalActive]);

    useEffect(() => {
        if (bookId) setIsModalActive(true);
    }, [bookId]);

    return (
        <ModalMenu
            fullMode
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
            callback={() => setBookId("")}
        >
            <div className="flex min-w-[700px] min-h-[400px] w-fit gap-10 md:p-6 h-fit">
                {isLoading ? (
                    <ContentLoader></ContentLoader>
                ) : book ? (
                    <>
                        <div className="flex flex-col gap-10 shrink-0 w-[200px]">
                            <div className="relative">
                                <div className="relative w-full aspect-[3/4]">
                                    {isImageLoaded || isImageLoading ? (
                                        <>
                                            {isImageLoading && (
                                                <div className="absolute flex justify-center items-center w-full h-full top-0 left-0">
                                                    <ContentLoader></ContentLoader>
                                                </div>
                                            )}
                                            <img
                                                src={book.image}
                                                alt=""
                                                className={`rounded-md object-cover`}
                                                onLoad={() => {
                                                    setIsImageLoaded(true);
                                                    setIsImageLoading(false);
                                                }}
                                                onError={() => {
                                                    setIsImageLoaded(false);
                                                    setIsImageLoading(false);
                                                }}
                                            />
                                        </>
                                    ) : (
                                        !isImageLoaded &&
                                        !isImageLoading && (
                                            <div className="bg-black text-white flex items-center h-full justify-center rounded-md">
                                                No Image
                                            </div>
                                        )
                                    )}
                                </div>
                                <img
                                    src={book?.ownerData.avatar}
                                    className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gray-500"
                                ></img>
                            </div>
                            {book.owner == user?.id ? (
                                <div className="flex flex-col gap-2.5">
                                    <div className="font-inter font-medium py-2.5 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer hover:text-white hover:bg-[#2B78B1] duration-300 select-none">
                                        Edytuj
                                    </div>
                                    {wasButtonPressed ? (
                                        <div className="font-inter font-medium py-2.5 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer hover:text-[#CD5E4F] hover:bg-white hover:border-[#CD5E4F] duration-300 select-none">
                                            Potwierdź
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => setWasButtonPresseed(true)}
                                            className="font-inter font-medium py-2.5 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer hover:text-[#CD5E4F] hover:bg-white hover:border-[#CD5E4F] duration-300 select-none"
                                        >
                                            Usuń
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2.5">
                                    <div
                                        className="font-inter font-medium py-2.5 px-2 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer duration-300"
                                        onClick={handleContactClick}
                                    >
                                        {wasButtonPressed ? (
                                            <div
                                                className="flex gap-2 items-center justify-center"
                                                title={book.messenger + " : " + book.messengerDescription}
                                            >
                                                <div>{messengers[book.messenger].icon}</div>
                                                <div className="text-ellipsis overflow-hidden ">
                                                    {book.messengerDescription}
                                                </div>
                                            </div>
                                        ) : (
                                            "Pokaż kontakt"
                                        )}
                                    </div>
                                    <div className="font-inter font-medium py-2.5 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#4F98CD] text-white rounded-lg cursor-pointer hover:text-[#4F98CD] hover:bg-white hover:border-[#4F98CD] duration-300 select-none">
                                        Zarezerwuj książkę
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="font-head font-normal text-[20px]">{book.title}</div>
                            <div className="grid grid-cols-[repeat(3,auto)] grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 w-fit pr-10">
                                <PublicationItem
                                    data={book.author}
                                    icon={<ProfileIcon />}
                                    title="Autor"
                                    bg="bg-[#a4e94d7a]"
                                ></PublicationItem>

                                <PublicationItem
                                    data={book.state}
                                    icon={<LeafIcon />}
                                    title="Stan"
                                    bg="bg-[#4d66e97a]"
                                ></PublicationItem>

                                <PublicationItem
                                    data={book.messengerDescription}
                                    icon={
                                        <div className="w-[15px] h-[15px]">
                                            {messengers[book.messenger || "Telegram"].icon}
                                        </div>
                                    }
                                    title={book.messenger}
                                    bg="bg-[#4d9ee9d9]"
                                ></PublicationItem>

                                <PublicationItem
                                    data={book.category}
                                    icon={<TagIcon />}
                                    title="Kategoria"
                                    bg="bg-[#e9d04d7a]"
                                ></PublicationItem>

                                <PublicationItem
                                    data={book.language}
                                    icon={<LanguageIcon />}
                                    title="Język"
                                    bg="bg-[#e97c4d7a]"
                                ></PublicationItem>
                            </div>
                            <div className="text-[#474747] font-light font-inter text-[15px] w-[500px] max-h-[138px] overflow-y-auto break-words">
                                {book.description}
                            </div>
                        </div>
                    </>
                ) : (
                    // <>
                    //     <div className="flex flex-col gap-10 shrink-0 w-[200px]">
                    //         <div className="relative">
                    //             <img src={book.image} alt="book" className="rounded-md aspect-[3/4] object-cover" />
                    //             <img
                    //                 src={book.ownerData.avatar}
                    //                 className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gray-500"
                    //             ></img>
                    //         </div>
                    //         {book.owner == user?.id ? (
                    //             <div className="flex flex-col gap-2.5">
                    //                 <div className="font-inter font-medium py-2.5 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer hover:text-white hover:bg-[#2B78B1] duration-300 select-none">
                    //                     Edytuj
                    //                 </div>
                    //                 {wasButtonPressed ? (
                    //                     <div className="font-inter font-medium py-2.5 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer hover:text-[#CD5E4F] hover:bg-white hover:border-[#CD5E4F] duration-300 select-none">
                    //                         Potwierdź
                    //                     </div>
                    //                 ) : (
                    //                     <div
                    //                         onClick={() => setWasButtonPresseed(true)}
                    //                         className="font-inter font-medium py-2.5 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer hover:text-[#CD5E4F] hover:bg-white hover:border-[#CD5E4F] duration-300 select-none"
                    //                     >
                    //                         Usuń
                    //                     </div>
                    //                 )}
                    //             </div>
                    //         ) : (
                    //             <div className="flex flex-col gap-2.5">
                    //                 <div
                    //                     className="font-inter font-medium py-2.5 px-2 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer duration-300"
                    //                     onClick={handleContactClick}
                    //                 >
                    //                     {wasButtonPressed ? (
                    //                         <div
                    //                             className="flex gap-2 items-center justify-center"
                    //                             title={book.messenger + " : " + book.messengerDescription}
                    //                         >
                    //                             <div>{messengers[book.messenger].icon}</div>
                    //                             <div className="text-ellipsis overflow-hidden ">
                    //                                 {book.messengerDescription}
                    //                             </div>
                    //                         </div>
                    //                     ) : (
                    //                         "Pokaż kontakt"
                    //                     )}
                    //                 </div>
                    //                 <div className="font-inter font-medium py-2.5 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#4F98CD] text-white rounded-lg cursor-pointer hover:text-[#4F98CD] hover:bg-white hover:border-[#4F98CD] duration-300 select-none">
                    //                     Zarezerwuj książkę
                    //                 </div>
                    //             </div>
                    //         )}
                    //     </div>
                    //     <div className="flex flex-col gap-8">
                    //         <div className="font-head font-normal text-[20px]">{book.title}</div>
                    //         <div className="grid grid-cols-2 grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 w-fit">
                    //             <div className="flex flex-col gap-3">
                    //                 <div className="flex gap-3 items-center">
                    //                     <ProfileIcon></ProfileIcon>
                    //                     <div className="text-[#4E4E4E]">Autor</div>
                    //                 </div>
                    //                 <div className="py-2 px-3 w-fit bg-[#a4e94d7a] rounded-sm">{book.author}</div>
                    //             </div>
                    //             <div className="flex flex-col gap-3">
                    //                 <div className="flex gap-3 items-center">
                    //                     <LeafIcon></LeafIcon>
                    //                     <div className="text-[#4E4E4E]">Stan</div>
                    //                 </div>
                    //                 <div className="py-2 px-3 w-fit bg-[#4d66e97a] rounded-sm">{book.state}</div>
                    //             </div>
                    //             <div className="flex flex-col gap-3">
                    //                 <div className="flex gap-3 items-center">
                    //                     <TagIcon></TagIcon>
                    //                     <div className="text-[#4E4E4E]">Kategoria</div>
                    //                 </div>
                    //                 <div className="py-2 px-3 w-fit bg-[#e9d04d7a] rounded-sm">{book.category}</div>
                    //             </div>
                    //             <div className="flex flex-col gap-3">
                    //                 <div className="flex gap-3 items-center">
                    //                     <LanguageIcon></LanguageIcon>
                    //                     <div className="text-[#4E4E4E]">Język</div>
                    //                 </div>
                    //                 <div className="py-2 px-3 w-fit bg-[#e97c4d7a] rounded-sm">{book.language}</div>
                    //             </div>
                    //         </div>
                    //         <div className="text-[#474747] font-light font-inter text-[15px]">{book.description}</div>
                    //     </div>
                    // </>
                    <div className="flex flex-col items-center w-full gap-6">
                        <div className="text-2xl">Takiej książki nie ma</div>
                        <div className="w-3/4 h-3/4">
                            <NotFoundIcon></NotFoundIcon>
                        </div>
                    </div>
                )}
            </div>
        </ModalMenu>
    );
}

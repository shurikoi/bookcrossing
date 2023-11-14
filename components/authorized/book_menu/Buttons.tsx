import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { bookData } from "../Main";
import { BookMenuMode } from "./BookMenu";
import ReservationMenu from "./ReservationMenu";
import { useBook } from "@/components/contexts/BookProvider";
import toast from "react-hot-toast";
import { messengers } from "../publication_menu/PublicationMenu";
import { useUserData } from "@/components/contexts/UserProvider";
import ModalMenu from "@/components/ui/ModalMenu";
import DeleteMenu from "./DeleteMenu";
import { useFilter } from "@/components/contexts/FilterProvider";
import ShareIcon from "@/components/ui/icons/ShareIcon";
import ShareButton from "./ShareButton";

export default function Buttons({ setMode }: { setMode: Dispatch<SetStateAction<BookMenuMode>> }) {
    const [wasButtonPressed, setWasButtonPresseed] = useState(false);

    const [isDeleteMenuActive, setIsDeleteMenuActive] = useState(false);

    const [isReservationMenuActive, setIsReservationMenuActive] = useState(false);
    const [isReservationLoading, setIsReservationLoading] = useState(false);

    const { bookId, book, setBook, setBooks } = useBook();

    const { user } = useUserData();

    const { choosenSort } = useFilter();

    useEffect(() => {
        setWasButtonPresseed(false);
    }, [bookId]);

    async function cancelReservation() {
        if (isReservationLoading) return;

        const cancelReservationPromise = new Promise(async (resolve, reject) => {
            setIsReservationLoading(true);

            try {
                const response = await fetch("/api/cancel-reservation", {
                    method: "post",
                    body: JSON.stringify({ id: bookId }),
                });

                if (!response.ok) throw new Error();

                setBook((book) => {
                    if (book)
                        return {
                            ...book,
                            isReserved: false,
                        };
                });

                setBooks((books) => {
                    const reservedBook = books.find((book) => book.id == bookId);

                    if (reservedBook) {
                        reservedBook.isReserved = false;

                        books.sort((a, b) => {
                            if (choosenSort == "desc") return Number(new Date(b.date)) - Number(new Date(a.date));



                            return Number(new Date(a.date)) - Number(new Date(b.date));
                        });

                        books.sort((a, b) => {
                            return Number(!!b.isReserved) - Number(!!a.isReserved);
                        });
                    }

                    return books;
                });

                resolve(1);
            } catch (error) {
                reject();
            }
            setIsReservationLoading(false);
        });

        toast.promise(cancelReservationPromise, {
            success: "Rezerwacja została anulowana",
            loading: "Anulujemy rezerwację...",
            error: "Nie udało się anulować rezerwację. Sprobuj ponownie",
        });
    }

    return (
        <>
            {book?.owner == user?.id ? (
                <div className="flex flex-col gap-2.5 w-full">
                    <div
                        className="font-inter font-medium py-2 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer hover:text-white hover:bg-[#2B78B1] duration-300 select-none"
                        onClick={() => setMode("edit")}
                    >
                        Edytuj
                    </div>
                    <div
                        onClick={() => setIsDeleteMenuActive(true)}
                        className="font-inter font-medium py-2 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer hover:text-[#CD5E4F] hover:bg-white hover:border-[#CD5E4F] duration-300 select-none"
                    >
                        Usuń
                    </div>
                    <DeleteMenu
                        isDeleteMenuActive={isDeleteMenuActive}
                        setIsDeleteMenuActive={setIsDeleteMenuActive}
                    ></DeleteMenu>
                </div>
            ) : (
                <div className="flex flex-col gap-2.5 w-full">
                    <div
                        className="font-inter font-medium py-2 px-2 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer duration-300"
                        onClick={() => {
                            if (!wasButtonPressed) setWasButtonPresseed(true);
                            else {
                                try {
                                    navigator.clipboard.writeText(book?.messengerDescription || "");

                                    toast.success("Skopiowane");
                                } catch (err) {
                                    toast.error("Nie udało się skopiować");
                                }
                            }
                        }}
                    >
                        {wasButtonPressed ? (
                            <div
                                className="flex gap-2 items-center justify-center"
                                title={book?.messenger + " : " + book?.messengerDescription}
                            >
                                <div className="w-6 h-6 shrink-0">
                                    <div>{messengers[book?.messenger || 0].icon}</div>
                                </div>

                                <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                                    {book?.messengerDescription}
                                </div>
                            </div>
                        ) : (
                            <div onClick={() => fetch("/api/increase-contact-count", { method: "POST", body: JSON.stringify({ bookId }) })}>
                                Pokaż kontakt
                            </div>
                        )}
                    </div>
                    {book?.isReserved ? (
                        <div
                            className={`font-inter font-medium py-2 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer duration-300 select-none ${isReservationLoading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"
                                }`}
                            onClick={cancelReservation}
                        >
                            Cofnij rezerwację
                        </div>
                    ) : (
                        <div className="flex gap-1">
                            <div
                                className={`w-full font-inter font-medium py-2 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#4F98CD] text-white rounded-lg cursor-pointer duration-300 select-none ${isReservationLoading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"
                                    }`}
                                onClick={() => {
                                    if (!isReservationLoading) setIsReservationMenuActive(true);
                                }}
                            >
                                Zarezerwuj książkę
                            </div>
                            <ShareButton />
                        </div>
                    )}
                </div>
            )}
            <ReservationMenu
                isMenuActive={isReservationMenuActive}
                setIsMenuActive={setIsReservationMenuActive}
                setIsReservationLoading={setIsReservationLoading}
            ></ReservationMenu>
        </>
    );
}

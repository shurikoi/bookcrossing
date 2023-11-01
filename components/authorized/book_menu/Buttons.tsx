import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { bookData } from "../Main";
import { BookMenuMode } from "./BookMenu";
import ReservationMenu from "./ReservationMenu";
import { useBook } from "@/components/contexts/BookProvider";
import toast from "react-hot-toast";
import { messengers } from "../publication_menu/PublicationMenu";
import { useUserData } from "@/components/contexts/UserProvider";

export default function Buttons({ setMode }: { setMode: Dispatch<SetStateAction<BookMenuMode>> }) {
    const [wasButtonPressed, setWasButtonPresseed] = useState(false);
    const [isReservationMenuActive, setIsReservationMenuActive] = useState(false);
    const [isReservationLoading, setIsReservationLoading] = useState(false);

    const { bookId, book, setBook } = useBook();

    const { user } = useUserData();

    useEffect(() => {
        setWasButtonPresseed(false);
    }, [bookId]);

    async function cancelReservation() {
        if (isReservationLoading) return;

        async function fetchData() {
            setIsReservationLoading(true);

            const response = await fetch("/api/cancel-reservation", {
                method: "post",
                body: JSON.stringify({ id: bookId }),
            });

            setBook((book) => {
                if (book)
                    return {
                        ...book,
                        reservedBy: undefined,
                    };
            });
            setIsReservationLoading(false);
        }

        toast.promise(fetchData(), {
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
                        className="font-inter font-medium py-2.5 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer hover:text-white hover:bg-[#2B78B1] duration-300 select-none"
                        onClick={() => setMode("edit")}
                    >
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
                <div className="flex flex-col gap-2.5 w-full">
                    <div
                        className="font-inter font-medium py-2.5 px-2 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer duration-300"
                        onClick={() => {
                            if (!wasButtonPressed) setWasButtonPresseed(true);
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
                            "Pokaż kontakt"
                        )}
                    </div>
                    {book?.reservedBy == user?.id ? (
                        <div
                            className={`font-inter font-medium py-2.5 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer duration-300 select-none ${
                                isReservationLoading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"
                            }`}
                            onClick={cancelReservation}
                        >
                            Cofnij rezerwację
                        </div>
                    ) : (
                        <div
                            className={`font-inter font-medium py-2.5 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#4F98CD] text-white rounded-lg cursor-pointer duration-300 select-none ${
                                isReservationLoading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"
                            }`}
                            onClick={() => {
                                if (!isReservationLoading) setIsReservationMenuActive(true);
                            }}
                        >
                            Zarezerwuj książkę
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

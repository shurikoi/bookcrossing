import { useBook } from "@/components/contexts/BookProvider";
import { useFilter } from "@/components/contexts/FilterProvider";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

interface ReservationButtonProps {
    isReservationLoading: boolean;
    setIsReservationLoading: Dispatch<SetStateAction<boolean>>;
}

export default function CancelReservationButton({
    isReservationLoading,
    setIsReservationLoading,
}: ReservationButtonProps) {
    const { bookId, setBook, setBooks } = useBook();
    const { choosenSort } = useFilter();

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
        <div
            className={`font-inter font-medium py-2 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer duration-300 select-none ${
                isReservationLoading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"
            }`}
            onClick={cancelReservation}
        >
            Cofnij rezerwację
        </div>
    );
}

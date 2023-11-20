import { useBook } from "@/components/contexts/BookProvider";
import ModalMenu from "@/components/ui/ModalMenu";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface RemoveBookMenuProps {
    isRemoveBookMenuActive: boolean;
    setIsRemoveBookMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function RemoveBookMenu({ isRemoveBookMenuActive, setIsRemoveBookMenuActive }: RemoveBookMenuProps) {
    const { setBookId, bookId, setFetchedBooks, setBooks } = useBook();

    function removeBook() {
        const removePromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/delete-publication", {
                    method: "post",
                    body: JSON.stringify({ id: bookId }),
                });

                if (!response.ok) throw new Error();

                setBooks((books) => books.filter((book) => book.id != bookId))
                setFetchedBooks((fetchedBooks) => {
                    delete fetchedBooks[bookId]

                    return fetchedBooks
                })
                setBookId("")

                resolve(1);
            } catch (error) {
                reject();
            }
        });

        toast.promise(removePromise, {
            success: "Książka została usunięta",
            loading: "Usuwamy książkę...",
            error: "Nie udało się usunąć książkę. Sprobuj ponownie",
        });
    }

    return (
        <ModalMenu isModalActive={isRemoveBookMenuActive} setIsModalActive={setIsRemoveBookMenuActive}>
            <div className="px-16 py-8 text-center flex flex-col gap-4">
                <div className="text-[18px]">Usunąć książkę?</div>
                <div className="font-extralight text-[14px]">
                    Następnie zostanie ona <br />
                    usunięta na stałe
                </div>
            </div>
            <div>
                <div
                    className="text-center py-2.5 select-none cursor-pointer border-t border-t-black/15 text-[#CD5E4F]"
                    onClick={removeBook}
                >
                    Usuń
                </div>
                <div
                    className="text-center py-2.5 select-none cursor-pointer border-t border-t-black/15"
                    onClick={() => {
                        setIsRemoveBookMenuActive(false);
                    }}
                >
                    Odrzuć
                </div>
            </div>
        </ModalMenu>
    );
}

import { useBook } from "@/components/contexts/BookProvider";
import ModalMenu from "@/components/ui/ModalMenu";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

interface DeleteMenuProps {
    isDeleteMenuActive: boolean;
    setIsDeleteMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteMenu({ isDeleteMenuActive, setIsDeleteMenuActive }: DeleteMenuProps) {
    const { setBookId, bookId, setFetchedBooks, setBooks } = useBook();

    function deleteBook() {
        const deletePromise = new Promise(async (resolve, reject) => {
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

        toast.promise(deletePromise, {
            success: "Książka została usunięta",
            loading: "Usuwamy książkę...",
            error: "Nie udało się usunąć książkę. Sprobuj ponownie",
        });
    }

    return (
        <ModalMenu isModalActive={isDeleteMenuActive} setIsModalActive={setIsDeleteMenuActive}>
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
                    onClick={deleteBook}
                >
                    Usuń
                </div>
                <div
                    className="text-center py-2.5 select-none cursor-pointer border-t border-t-black/15"
                    onClick={() => {
                        setIsDeleteMenuActive(false);
                    }}
                >
                    Odrzuć
                </div>
            </div>
        </ModalMenu>
    );
}

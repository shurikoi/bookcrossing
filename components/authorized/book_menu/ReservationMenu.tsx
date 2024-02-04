import { useBook } from "@/components/contexts/BookProvider";
import DropDownMenuWithChoose from "@/components/ui/DropDownMenuWithChoose";
import ModalMenu from "@/components/ui/ModalMenu";
import Button from "@/components/ui/buttons/Button";
import EmailIcon from "@/components/ui/icons/EmailIcon";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
import { messenger, messengers } from "../publication_menu/PublicationMenu";
import { useScreen } from "@/components/contexts/ScreenProvider";

interface ReservationMenuProps {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
    setIsReservationLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ReservationMenu({
    isMenuActive,
    setIsMenuActive,
    setIsReservationLoading,
}: ReservationMenuProps) {
    const [messenger, setMessenger] = useState<messenger>("Snapchat");
    const [contact, setContact] = useState("");

    const [addToProfile, setAddToProfile] = useState(true);

    const { bookId, setBook, setBooks } = useBook();

    function reserveBook() {
        if (contact.trim().length > 0) {
            const reservationPromise = new Promise(async (resolve, reject) => {
                try {
                    setIsMenuActive(false);
                    setContact("");
                    setAddToProfile(false);

                    setIsReservationLoading(true);

                    const response = await fetch("/api/reserve-book", {
                        method: "post",
                        body: JSON.stringify({ id: bookId, contact, messenger, addToProfile }),
                    });

                    if (!response.ok) throw new Error();

                    setBook((book) => {
                        if (book)
                            return {
                                ...book,
                                isReserved: true,
                            };
                    });

                    setBooks((books) => {
                        const reservedBook = books.find((book) => book.id == bookId);

                        if (reservedBook) {
                            reservedBook.isReserved = true;
                            reservedBook.expires = new Date(Date.now() + 3 * 1000 * 60 * 60 * 24)

                            return books.sort((a, b) => {
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

            toast.promise(reservationPromise, {
                success: "Książka została zarezerwowana",
                error: "Nie udało się zarezerwować książkę. Sprobuj ponownie",
                loading: "Rezerwujemy dla cię książkę...",
            });
        } else toast.error("Uzupełnij pole kontaktu");
    }

    return (
        <ModalMenu isModalActive={isMenuActive} setIsModalActive={setIsMenuActive}>
            <div className="flex flex-col gap-8 items-center text-center py-8 px-20">
                <EmailIcon></EmailIcon>
                <div className="text-[17px] font-light">
                    Kontakt <br />
                    do Ciebie
                </div>
                <DropDownMenuWithChoose
                    mode="text&icons"
                    items={messengers}
                    item={messenger}
                    setItem={setMessenger}
                ></DropDownMenuWithChoose>
                <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Kontakt"
                    className="font-inter placeholder:text-black font-regular text-[17px] border-b border-b-black"
                />
                <div className="flex font-extralight text-sm select-none">
                    <input
                        type="checkbox"
                        className="cursor-pointer"
                        id="contact"
                        checked={addToProfile}
                        onChange={(e) => setAddToProfile((prev) => !prev)}
                    />
                    <label htmlFor="contact" className="pl-3 cursor-pointer ">
                        Dodaj do profilu
                    </label>
                </div>
                <Button onClick={reserveBook}>Zarezerwuj książkę</Button>
            </div>
        </ModalMenu>
    );
}

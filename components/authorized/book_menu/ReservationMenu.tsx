import ModalMenu from "@/components/ui/ModalMenu";
import EmailIcon from "@/components/ui/icons/EmailIcon";
import { Dispatch, SetStateAction, useState } from "react";
import { messenger, messengers } from "../publication_menu/PublicationMenu";
import DropDownMenuWithChoose from "@/components/ui/DropDownMenuWithChoose";
import Button from "@/components/ui/buttons/Button";
import { useBook } from "@/components/contexts/BookProvider";
import toast from "react-hot-toast";
import { useUserData } from "@/components/contexts/UserProvider";

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

    const [addToProfile, setAddToProfile] = useState(false);

    const { bookId, setBook } = useBook();
    const { user } = useUserData();

    async function reserveBook() {
        if (contact.trim().length > 0) {
            async function fetchData() {
                setIsMenuActive(false);
                setContact("");
                setAddToProfile(false);
                
                setIsReservationLoading(true);

                const response = await fetch("/api/reserve-book", {
                    method: "post",
                    body: JSON.stringify({ id: bookId, contact, messenger, addToProfile }),
                });

                setBook((book) => {
                    if (book)
                        return {
                            ...book,
                            reservedBy: user?.id,
                        };
                });

                setIsReservationLoading(false);
            }
            toast.promise(fetchData(), {
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

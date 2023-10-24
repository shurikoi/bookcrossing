import ModalMenu from "@/components/ui/ModalMenu";
import EmailIcon from "@/components/ui/icons/EmailIcon";
import { Dispatch, SetStateAction, useState } from "react";
import { messenger, messengers } from "../publication_menu/PublicationMenu";
import DropDownMenuWithChoose from "@/components/ui/DropDownMenuWithChoose";
import Button from "@/components/ui/buttons/Button";
import { useBook } from "@/components/contexts/BookProvider";
import toast from "react-hot-toast";

interface ReservationMenuProps {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function ReservationMenu({ isMenuActive, setIsMenuActive }: ReservationMenuProps) {
    const [messenger, setMessenger] = useState<messenger>("Snapchat");
    const [contact, setContact] = useState("");

    const { bookId } = useBook();

    async function reserveBook() {
        if (contact.trim().length > 0) {
            const response = await fetch("/api/reserve-book", {
                method: "post",
                body: JSON.stringify({ id: bookId, contact }),
            });

            const data = await response.json();

            setIsMenuActive(false)
            setContact("")
        }
        else {
            toast.error("Uzupełnij pole kontaktu")
        }
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
                <Button onClick={reserveBook}>Zarezerwuj książkę</Button>
            </div>
        </ModalMenu>
    );
}

import { Dispatch, SetStateAction, useState } from "react";
import ReservationMenu from "../../authorized/book_menu/ReservationMenu";

interface ReservationButtonProps {
    isReservationLoading: boolean;
    setIsReservationLoading: Dispatch<SetStateAction<boolean>>;
}

export default function ReservationButton({ isReservationLoading, setIsReservationLoading }: ReservationButtonProps) {
    const [isReservationMenuActive, setIsReservationMenuActive] = useState(false);

    return (
        <>
            <div
                className={`w-full font-inter font-medium py-2 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#4F98CD] text-white rounded-lg cursor-pointer duration-300 select-none ${
                    isReservationLoading ? "opacity-50 cursor-default" : "opacity-100 cursor-pointer"
                }`}
                onClick={() => {
                    if (!isReservationLoading) setIsReservationMenuActive(true);
                }}
            >
                Zarezerwuj książkę
            </div>
            <ReservationMenu
                isMenuActive={isReservationMenuActive}
                setIsMenuActive={setIsReservationMenuActive}
                setIsReservationLoading={setIsReservationLoading}
            ></ReservationMenu>
        </>
    );
}

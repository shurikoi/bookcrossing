import { Dispatch, SetStateAction, useState } from "react";
import { BookMenuMode } from "./BookMenu";
import { useBook } from "@/components/contexts/BookProvider";
import { useUserData } from "@/components/contexts/UserProvider";
import RemoveBookMenu from "./RemoveBookMenu";
import ShareButton from "./ShareButton";
import ReservationButton from "../../ui/buttons/ReservationButton";
import CancelReservationButton from "../../ui/buttons/CancelReservationButton";
import ContactButton from "../../ui/buttons/ContactButton";

export default function Buttons({ setMode }: { setMode: Dispatch<SetStateAction<BookMenuMode>> }) {
    const [isRemoveBookMenuActive, setIsRemoveBookMenuActive] = useState(false);
    const [isReservationLoading, setIsReservationLoading] = useState(false);

    const { book } = useBook();

    const { user } = useUserData();

    return (
        <>
            {book?.owner == user?.id ? (
                <div className="flex flex-col gap-2.5 w-full">
                    <div
                        className="font-inter font-medium py-2 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer select-none"
                        onClick={() => setMode("edit")}
                    >
                        Edytuj
                    </div>
                    <div
                        onClick={() => setIsRemoveBookMenuActive(true)}
                        className="font-inter font-medium py-2 text-center border-2 active:scale-[0.99] will-change-transform border-transparent bg-[#CD5E4F] text-white rounded-lg cursor-pointer select-none"
                    >
                        Usuń
                    </div>
                    <RemoveBookMenu
                        isRemoveBookMenuActive={isRemoveBookMenuActive}
                        setIsRemoveBookMenuActive={setIsRemoveBookMenuActive}
                    ></RemoveBookMenu>
                </div>
            ) : (
                <div className="flex flex-col gap-2.5 w-full">
                    <ContactButton></ContactButton>
                    {book?.isReserved ? (
                        <CancelReservationButton
                            isReservationLoading={isReservationLoading}
                            setIsReservationLoading={setIsReservationLoading}
                        ></CancelReservationButton>
                    ) : (
                        <div className="flex gap-1">
                            <ReservationButton
                                isReservationLoading={isReservationLoading}
                                setIsReservationLoading={setIsReservationLoading}
                            ></ReservationButton>
                            <ShareButton />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

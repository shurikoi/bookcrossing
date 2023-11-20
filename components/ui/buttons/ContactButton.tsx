import { useBook } from "@/components/contexts/BookProvider";
import { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { messengers } from "../../authorized/publication_menu/PublicationMenu";

export default function ContactButton() {
    const [wasButtonPressed, setWasButtonPressed] = useState(false);

    const { bookId, book } = useBook();

    useLayoutEffect(() => {
        if (!!bookId) setWasButtonPressed(false);
    }, [bookId]);

    function copyToClipboard() {
        if (!wasButtonPressed) setWasButtonPressed(true);
        else {
            try {
                navigator.clipboard.writeText(book?.messengerDescription || "");

                toast.success("Skopiowane");
            } catch (err) {
                toast.error("Nie udało się skopiować");
            }
        }
    }

    return (
        <div
            className="font-inter font-medium py-2 px-2 border-2 active:scale-[0.99] will-change-transform text-center border-[#2B78B1] text-[#2B78B1] rounded-lg cursor-pointer duration-300"
            onClick={copyToClipboard}
        >
            {wasButtonPressed ? (
                <div
                    className="flex gap-2 items-center justify-center"
                    title={book?.messenger + " : " + book?.messengerDescription}
                >
                    <div className="w-6 h-6 shrink-0">
                        <div>{messengers[book?.messenger || 0].icon}</div>
                    </div>

                    <div className="text-ellipsis overflow-hidden whitespace-nowrap">{book?.messengerDescription}</div>
                </div>
            ) : (
                <div
                    onClick={() =>
                        fetch("/api/increase-contact-count", {
                            method: "POST",
                            body: JSON.stringify({ bookId }),
                        })
                    }
                >
                    Pokaż kontakt
                </div>
            )}
        </div>
    );
}

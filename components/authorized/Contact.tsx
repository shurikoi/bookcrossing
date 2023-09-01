import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import TelegramIcon from "../ui/icons/TelegramIcon";
import SnapchatIcon from "../ui/icons/SnapchatIcon";
import MessengerIcon from "../ui/icons/MessengerIcon";
import InstagramIcon from "../ui/icons/InstagramIcon";
import useClickOutside from "../hooks/useClickOutside";

interface messengers {
    [key: string]: {
        name: messenger;
        icon: JSX.Element;
    };
}

export const messengers: messengers = {
    Telegram: { name: "Telegram", icon: <TelegramIcon /> },
    Snapchat: { name: "Snapchat", icon: <SnapchatIcon /> },
    Messenger: { name: "Messenger", icon: <MessengerIcon /> },
    Instagram: { name: "Instagram", icon: <InstagramIcon /> },
};

export type messenger = "Telegram" | "Snapchat" | "Messenger" | "Instagram";

interface ContactProps {
    messenger: messenger;
    setMessenger: Dispatch<SetStateAction<messenger>>;
}

export default function Contact({ messenger, setMessenger }: ContactProps) {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => {
        setIsMenuActive(false);
    });

    return (
        <div className="relative select-none" ref={menuRef}>
            <div
                className="flex hover:bg-green bg-white gap-2 items-center cursor-pointer"
                onClick={() => setIsMenuActive((isActive) => !isActive)}
            >
                <div>{messengers[messenger].icon}</div>
                <div>{messengers[messenger].name}</div>
            </div>
            <ContactMenu
                isActive={isMenuActive}
                setIsActive={setIsMenuActive}
                messenger={messenger}
                setMessenger={setMessenger}
            />
        </div>
    );
}

interface ContactMenuProps {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    messenger: messenger;
    setMessenger: Dispatch<SetStateAction<messenger>>;
}

function ContactMenu({ isActive, setIsActive, messenger, setMessenger }: ContactMenuProps) {
    const filteredMessenger = useMemo(
        () => Object.values(messengers).filter((messengerItem) => messengerItem.name != messenger),
        [messenger]
    );

    return (
        <div
            className={`${
                isActive ? "opacity-100  pointer-events-auto" : "opacity-0  pointer-events-none"
            } absolute flex flex-col -bottom-2 -left-2 translate-y-[100%] shadow-md rounded-lg border border-black/10 duration-300 overflow-auto`}
        >
            {filteredMessenger.map((messenger) => (
                <div
                    className="flex bg-white gap-2 p-2 items-center cursor-pointer hover:bg-gray-100 duration-300"
                    onClick={() => {
                        setIsActive(false);
                        setMessenger(messenger.name);
                    }}
                    key={messenger.name}
                >
                    <div>{messenger.icon}</div>
                    <div>{messenger.name}</div>
                </div>
            ))}
        </div>
    );
}

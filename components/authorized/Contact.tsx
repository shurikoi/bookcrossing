import { Dispatch, RefObject, SetStateAction, useMemo, useRef, useState } from "react";
import TelegramIcon from "../ui/icons/TelegramIcon";
import SnapchatIcon from "../ui/icons/SnapchatIcon";
import MessengerIcon from "../ui/icons/MessengerIcon";
import InstagramIcon from "../ui/icons/InstagramIcon";
import useClickOutside from "../hooks/useClickOutside";
import DropDownMenu from "../DropDownMenu";

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
                isMenuActive={isMenuActive}
                setIsMenuActive={setIsMenuActive}
                messenger={messenger}
                setMessenger={setMessenger}
                menuRef={menuRef}
            />
        </div>
    );
}

interface ContactMenuProps {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
    messenger: messenger;
    setMessenger: Dispatch<SetStateAction<messenger>>;
    menuRef: RefObject<HTMLDivElement>;
}

function ContactMenu({ isMenuActive, setIsMenuActive, messenger, setMessenger, menuRef }: ContactMenuProps) {
    const filteredMessenger = Object.values(messengers).filter((messengerItem) => messengerItem.name != messenger);

    return (
        <DropDownMenu isMenuActive={isMenuActive} setIsMenuActive={setIsMenuActive} menuRef={menuRef}>
            <div className="absolute flex flex-col -bottom-2 -left-2 translate-y-[100%] shadow-md rounded-lg border border-black/10 duration-300 overflow-auto">
                {filteredMessenger.map((messenger) => (
                    <div
                        className="flex bg-white gap-2 p-2 items-center cursor-pointer hover:bg-gray-100 duration-300"
                        onClick={() => {
                            setIsMenuActive(false);
                            setMessenger(messenger.name);
                        }}
                        key={messenger.name}
                    >
                        <div>{messenger.icon}</div>
                        <div>{messenger.name}</div>
                    </div>
                ))}
            </div>
        </DropDownMenu>
    );
}

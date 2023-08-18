import Bell from "./ui/BellIcon";
import UserMenu from "./UserMenu";
import { useState, useRef } from "react";
import CheckClickOutside from "./CheckClickOutside";
import Image from "next/image";
import SettingsMenu from "./SettingsMenu";
import { useUserData } from "./contexts/UserProviders";

export default function Header() {
    const { user } = useUserData();
    const [menuActive, setMenuActive] = useState<boolean>(false);
    const [isSettingsMenuActive, setIsSettingsMenuActive] = useState<boolean>(true);

    const menuRef = useRef<HTMLDivElement>(null);
    return (
        <>
            <header
                className="bg-black
        flex items-center py-4 px-10 relative box-border bg-no-repeat bg-cover bg-center bg-[url(/images/header.png)]"
            >
                <div className="flex items-center justify-between mr-auto">
                    <div className="text-2xl text-white font-head">BookCrossing</div>
                </div>
                <div className="flex items-center gap-[30px]">
                    <div className="p-2 bg-white rounded-full shadow-md shadow-black/30">
                        <Bell></Bell>
                    </div>
                    <div className="flex items-center gap-6 bg-white border-[#DFDFE0] border-[3px] rounded-full px-3 py-1">
                        <Image src="/images/image 1359.png" alt="" width={20} height={20}></Image>
                        <div className="text-lg font-normal">{user?.points}</div>
                    </div>
                    <CheckClickOutside isActive={menuActive} setIsActive={setMenuActive} elRef={menuRef}>
                        <div className="relative" ref={menuRef}>
                            <div
                                className="flex items-center gap-2 text-xl font-normal text-white cursor-pointer"
                                onClick={() => setMenuActive((menuActive) => !menuActive)}
                            >
                                <div className="select-none">{user?.name}</div>
                                <svg
                                    className="mt-1 "
                                    width="15"
                                    height="13"
                                    viewBox="0 0 15 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M7.5 12.125L0 0.875H15L7.5 12.125Z" fill="white" />
                                </svg>
                            </div>
                            <UserMenu
                                menuActive={menuActive}
                                setIsSettingsMenuActive={setIsSettingsMenuActive}
                                setMenuActive={setMenuActive}
                            />
                        </div>
                    </CheckClickOutside>
                </div>
            </header>
            <SettingsMenu
                isSettingsMenuActive={isSettingsMenuActive}
                setIsSettingsMenuActive={setIsSettingsMenuActive}
            />
        </>
    );
}

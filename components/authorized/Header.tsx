import BellIcon from "../ui/icons/BellIcon";
import UserMenu from "./UserMenu";
import { useState, useRef, memo } from "react";
import Image from "next/image";
import SettingsMenu from "./settings_menu/SettingsMenu";
import { useUserData } from "../contexts/UserProvider";
import useClickOutside from "../hooks/useClickOutside";

export default memo(function Header() {
    const { user } = useUserData();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);

    useClickOutside(menuRef, () => {
        setIsMenuActive(false);
    });

    return (
        <>
            <header className="bg-black z-10 flex items-center flex-col md:flex-row py-4 px-10 relative box-border bg-no-repeat bg-cover bg-center bg-[url(/images/header.png)]">
                <div className="flex items-center justify-between md:mr-auto">
                    <div className="text-2xl text-white font-head">BookCrossing</div>
                </div>
                <div className="flex items-center gap-[30px]">
                    <div className="hidden md:flex md:items-center md:gap-[30px]">
                        <div className="p-2 bg-white rounded-full shadow-md shadow-black/30 cursor-pointer hover:-translate-y-0.5 duration-200">
                            <BellIcon></BellIcon>
                        </div>
                        <div className="flex items-center gap-6 bg-white border-[#DFDFE0] border-[3px] rounded-full px-3 py-1">
                            <Image src="/images/image 1359.png" alt="" width={20} height={20}></Image>
                            <div className="text-lg font-normal">{user?.points}</div>
                        </div>
                    </div>
                    <div className="relative" ref={menuRef}>
                        <div
                            className="flex items-center gap-2 text-xl font-normal text-white cursor-pointer"
                            onClick={() => setIsMenuActive((menuActive) => !menuActive)}
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
                            isMenuActive={isMenuActive}
                            setIsSettingsMenuActive={setIsSettingsMenuActive}
                            setMenuActive={setIsMenuActive}
                            menuRef={menuRef}
                        />
                    </div>
                </div>
            </header>
            <SettingsMenu isMenuActive={isSettingsMenuActive} setIsMenuActive={setIsSettingsMenuActive} />
        </>
    );
});

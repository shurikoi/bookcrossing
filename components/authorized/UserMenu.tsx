import { signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction, RefObject } from "react";
import { useUserData } from "../contexts/UserProvider";
import DropDownMenu from "../ui/DropDownMenu";
interface UserMenuProps {
    isMenuActive: boolean;
    setIsSettingsMenuActive: Dispatch<SetStateAction<boolean>>;
    setMenuActive: Dispatch<SetStateAction<boolean>>;
    menuRef: RefObject<HTMLDivElement>;
}
export default function UserMenu({ isMenuActive, setIsSettingsMenuActive, setMenuActive, menuRef }: UserMenuProps) {
    const { user } = useUserData();

    return (
        <DropDownMenu
            isMenuActive={isMenuActive}
            setIsMenuActive={setMenuActive}
            menuRef={menuRef}
            className="absolute right-1/2 translate-x-1/2  sm:translate-x-0 -bottom-3 translate-y-[100%] sm:right-0 shadow-lg rounded-lg flex flex-col gap-4 bg-white pt-5 py-3.5 md:py-6 w-[80vw] md:w-auto md:px-4 z-10 text-center sm:text-left"
        >
            <div className="flex flex-col px-3">
                <div className="font-normal whitespace-pre">
                    {user?.name} {user?.surname}
                </div>
                <div className="font-extralight">{user?.email}</div>
            </div>
            <div className="flex flex-col select-none">
                <div
                    className="p-3 sm:pr-48 cursor-pointer duration-200 font-normal rounded-md hover:bg-[#F2F9F0]"
                    onClick={() => {
                        setMenuActive(false);
                        setIsSettingsMenuActive(true);
                    }}
                >
                    Ustawienia
                </div>
                <div
                    className="p-3 sm:pr-48 cursor-pointer duration-200 font-normal rounded-md hover:bg-[#F2F9F0]"
                    onClick={() => signOut({ redirect: false })}
                >
                    Wyloguj
                </div>
            </div>
        </DropDownMenu>
    );
}

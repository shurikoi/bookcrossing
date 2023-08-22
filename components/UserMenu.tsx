import { signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { useUserData } from "./contexts/UserProviders";
interface UserMenu {
    menuActive: boolean;
    setIsSettingsMenuActive: Dispatch<SetStateAction>;
    setMenuActive: Dispatch<SetStateAction>;
}
export default function UserMenu({ menuActive, setIsSettingsMenuActive, setMenuActive }: UserMenu) {
    const { user } = useUserData();

    const activeStyle: React.CSSProperties = { opacity: 1, pointerEvents: "all" };
    const inActiveStyle: React.CSSProperties = { opacity: 0, pointerEvents: "none" };
    const style: React.CSSProperties = menuActive ? activeStyle : inActiveStyle;
    return (
        <div
            className="absolute right-0 bottom-[-16px] translate-y-[100%] shadow-lg rounded-lg flex flex-col gap-4 bg-white py-6 px-4 duration-200 z-10 "
            style={style}
        >
            <div className="flex flex-col px-3">
                <div className="font-normal whitespace-pre">
                    {user?.name} {user?.surname}
                </div>
                <div className="font-extralight">{user?.email}</div>
            </div>
            <div className="flex flex-col">
                <div
                    className="p-3 pr-48 cursor-pointer duration-200 font-normal rounded-md hover:bg-[#F2F9F0]"
                    onClick={() => {
                        setMenuActive(false);
                        setIsSettingsMenuActive((prevState) => !prevState);
                    }}
                >
                    Ustawienia
                </div>
                <div
                    className="p-3 pr-48 cursor-pointer duration-200 font-normal rounded-md hover:bg-[#F2F9F0]"
                    onClick={() => signOut()}
                >
                    Wyloguj
                </div>
            </div>
        </div>
    );
}

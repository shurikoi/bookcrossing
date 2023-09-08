import { signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { useUserData } from "../contexts/UserProviders";
interface UserMenu {
    isMenuActive: boolean;
    setIsSettingsMenuActive: Dispatch<SetStateAction<boolean>>;
    setMenuActive: Dispatch<SetStateAction<boolean>>;
}
export default function UserMenu({ isMenuActive, setIsSettingsMenuActive, setMenuActive }: UserMenu) {
    const { user } = useUserData();

    return (
        <div
            className={`${
                isMenuActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            } absolute right-1/2 translate-x-1/2  sm:translate-x-0 -bottom-3 translate-y-[100%] sm:right-0 shadow-lg rounded-lg flex flex-col gap-4 bg-white py-6 px-4 duration-200 z-10 text-center sm:text-left`}
        >
            <div className="flex flex-col px-3">
                <div className="font-normal whitespace-pre">
                    {user?.name} {user?.surname}
                </div>
                <div className="font-extralight">{user?.email}</div>
            </div>
            <div className="flex flex-col ">
                <div
                    className="p-3 sm:pr-48 cursor-pointer duration-200 font-normal rounded-md hover:bg-[#F2F9F0]"
                    onClick={() => {
                        setMenuActive(false);
                        setIsSettingsMenuActive((prevState) => !prevState);
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
        </div>
    );
}

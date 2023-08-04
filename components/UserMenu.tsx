import { signOut, useSession } from "next-auth/react";


export default function UserMenu({menuActive} : {menuActive: boolean}) {
    const { data: session, status } = useSession();

    return (
        <div
            className="absolute right-0 bottom-[-16px] translate-y-[100%] shadow-lg rounded-lg flex flex-col gap-4 bg-white py-6 px-4 duration-200 z-10 "
            style={menuActive ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }}
        >
            <div className="flex flex-col px-3">
                <div className="font-normal whitespace-pre">
                    {session?.user.name} {session?.user.surname}
                </div>
                <div className="font-extralight">{session?.user.email}</div>
            </div>
            <div className="flex flex-col">
                <div className="p-3 pr-48 cursor-pointer duration-200 font-normal rounded-md hover:bg-[#F2F9F0]">Ustawienia</div>
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

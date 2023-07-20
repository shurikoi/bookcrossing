import { signOut, useSession } from "next-auth/react";

export default function UserMenu({ menuActive }: { menuActive: boolean }) {
    console.log(menuActive);
    const { data: session, status } = useSession();

    return (
        <div
            className="absolute right-0 bottom-[-16px] translate-y-[100%] shadow-lg rounded-2xl flex flex-col gap-4 bg-white py-6 px-9 duration-200"
            style={menuActive ? { opacity: 1, pointerEvents: "all" } : { opacity: 0, pointerEvents: "none" }}
        >
            <div className="flex flex-col px-3">
                <div className="font-medium whitespace-pre">
                    {session?.user.name} {session?.user.surname}
                </div>
                <div className="font-extralight">{session?.user.email}</div>
            </div>
            <div className="flex flex-col">
                <div className="p-3 pr-32 cursor-pointer duration-200 font-medium hover:bg-gray-100">Ustawienia</div>
                <div
                    className="p-3 pr-32 cursor-pointer duration-200 font-medium hover:bg-gray-100"
                    onClick={() => signOut()}
                >
                    Wyloguj
                </div>
            </div>
        </div>
    );
}

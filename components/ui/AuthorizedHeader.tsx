import { signOut, useSession } from "next-auth/react";
import Bell from "./Bell";
import Stars from "./Stars";

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <header className="bg-[black] flex items-center py-12 px-10 relative box-border bg-no-repeat bg-cover bg-center bg-[url(http://localhost:3000/images/header.png)]">
            <div className="flex items-center justify-between mr-auto">
                <div className="text-3xl text-white">BookCrossing</div>
            </div>
            <div className="flex items-center gap-6">
                <div className="rounded-full bg-white shadow-md p-4">
                    <Bell></Bell>
                </div>
                <div className="flex items-center gap-6 bg-white border-[#DFDFE0] border-[5px] rounded-full px-3 py-1">
                    <Stars></Stars>
                    <div className="text-xl font-medium">{session?.user.points}</div>
                </div>
                <div>
                    <div
                        className="flex gap-2 items-center text-white text-2xl font-medium cursor-pointer
"
                    >
                        <div className="">{session?.user.name}</div>
                        <svg
                            className=" mt-1"
                            width="15"
                            height="13"
                            viewBox="0 0 15 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M7.5 12.125L0 0.875H15L7.5 12.125Z" fill="white" />
                        </svg>
                    </div>
                    <div>
                        <div onClick={() => signOut()}>sign out</div>
                    </div>
                </div>
            </div>
        </header>
    );
}

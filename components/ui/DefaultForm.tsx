import Image from "next/image";
import ArrowBtn from "@/components/ui/ArrowBtn";
import { currentState } from "./AuthForm";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import isEmailValid from "@/lib/isEmailValid";

interface DefaultForm {
    setEmail: Dispatch<SetStateAction<string>>;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
    email: string;
    className?: string;
}

export default function DefaultForm({ setEmail, className, setCurrentState, email }: DefaultForm) {
    const [error, setError] = useState<boolean>(false);

    function handleClick() {
        if (isEmailValid(email)) {
            setError(false);
            setCurrentState("signin");
        } else {
            setError(true);
        }
    }

    return (
        <>
            <div className="text-2xl font-semibold">Zaloguj się lub zarejestruj w kilka sekund</div>
            <div className="text-[13px] font-extralight">
                Użyj adresu e-mail. Sprawdzimy, czy już masz konto. Jeśli nie, pomożemy Ci je utworzyć.
            </div>
            <div
                className={`${
                    error ? "border-[#8a2a2a]" : "border-[#61C558]"
                } border-2 rounded-lg px-4 py-2.5 text-[15px] flex justify-between duration-300`}
            >
                <input
                    type="text"
                    placeholder="myemail@example.com"
                    className="outline-none"
                    value={email}
                    onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                />
                <ArrowBtn
                    wrapperClassName="bg-[#95ED8E]"
                    onClick={handleClick}
                    isError={error}
                ></ArrowBtn>
            </div>
            <div className="font-medium text-[15px]">Lub</div>
            <div className="flex gap-6 px-5 py-3 items-center bg-[#EFEFEF] rounded-lg">
                <Image alt="" src="/images/google.png" width={25} height={25}></Image>
                <div className="font-extralight cursor-pointer">Kontynuuj przez Google</div>
            </div>
        </>
    );
}

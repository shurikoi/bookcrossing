import Image from "next/image";
import ArrowBtn from "@/components/ui/ArrowBtn";
import { currentState } from "./AuthForm";
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import ContentLoader from "../ui/ContentLoader";
import WarningIcon from "../ui/icons/WarningIcon";
import { validateEmail, validateUserData } from "@/lib/isUserDataValid";

type DefaultForm = {
    setEmail: Dispatch<SetStateAction<string>>;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
    email: string;
    formActive: boolean;
};

export default function DefaultForm({ setEmail, setCurrentState, email, formActive }: DefaultForm) {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    async function handleSubmit() {
        setLoading(true);
        setIsEmailValid(false);

        if (validateEmail(email).isValid) {
            setIsEmailValid(true);

            const response = await fetch("/api/checkUser", {
                method: "POST",
                body: JSON.stringify({ email }),
            });

            const data: { isExist: boolean } = await response.json();

            if (data.isExist) setCurrentState("signin");
            else setCurrentState("signup");

            setLoading(false);
        } else {
            setTimeout(() => {
                setLoading(false);

                setIsEmailValid(false);
            }, 250);
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") handleSubmit();
    }

    function handleSignIn() {
        const h = 700;
        const w = 600;
        // dual screen fix
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth
            ? window.innerWidth
            : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;
        const height = window.innerHeight
            ? window.innerHeight
            : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft;
        const top = (height - h) / 2 / systemZoom + dualScreenTop;

        const newWindow = window.open(
            "/google-signin",
            "",
            `popup=true,height=${h},width=${w},top=${top},left=${left}`
        );

        newWindow?.focus();
    }

    return (
        <>
            <div className="flex gap-3 flex-col items-center">
                <div className="font-medium text-[20px] sm:text-[24px]">Zaloguj się lub zarejestruj w kilka sekund</div>
                <div className="text-[13px] font-extralight">
                    Sprawdzimy, czy już masz konto. Jeśli nie, pomożemy Ci je utworzyć.
                </div>
            </div>
            <div
                className={`relative border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px] flex justify-between duration-300 w-full md:w-auto gap-3`}
            >
                <input
                    type="email"
                    autoComplete="email"
                    name="email"
                    autoCorrect="off"
                    placeholder="myemail@example.com"
                    className="placeholder:font-light w-full"
                    value={email}
                    onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                <div className="relative w-7 h-7">
                    {loading ? <ContentLoader></ContentLoader> : <ArrowBtn onClick={handleSubmit}></ArrowBtn>}
                </div>

                {!isEmailValid && (
                    <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-5 left-0">
                        <>
                            <WarningIcon />
                            <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                                Nie prawidłowy email. Spróbuj jeszcze raz
                            </div>
                        </>
                    </div>
                )}
            </div>
            <div className="font-normal text-[15px]">Lub</div>
            <div
                className="flex gap-4 px-5 py-3 items-center bg-[#EFEFEF] rounded-lg cursor-pointer"
                onClick={handleSignIn}
            >
                <Image alt="" src="/images/google.png" width={25} height={25}></Image>
                <div className="font-light text-[16px] text-[#525252]">Kontynuuj przez Google</div>
            </div>
        </>
    );
}

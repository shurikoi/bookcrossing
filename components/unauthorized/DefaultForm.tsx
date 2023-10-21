import Image from "next/image";
import { currentState } from "./AuthForm";
import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import ContentLoader from "../ui/ContentLoader";
import WarningIcon from "../ui/icons/WarningIcon";
import { validateEmail } from "@/lib/isUserDataValid";

type DefaultForm = {
    setEmail: Dispatch<SetStateAction<string>>;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
    email: string;
};

export default function DefaultForm({ setEmail, setCurrentState, email }: DefaultForm) {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setLoading(true);
        setIsEmailValid(false);

        if (validateEmail(email).isValid) {
            setIsEmailValid(true);

            const response = await fetch("/api/check-user", {
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
        <div className="flex items-center flex-col gap-8 w-full md:max-w-[500px] text-center px-6 py-8 sm:px-10 sm:py-10">
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
                    type="text"
                    autoComplete="email"
                    name="email"
                    autoCorrect="off"
                    placeholder="myemail@example.com"
                    className="placeholder:font-light w-full"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value.trim());
                        console.log(e.target, e.target.value, e.target.value.trim());
                    }}
                    onKeyDown={handleKeyDown}
                />
                <div className="relative w-7 h-7">
                    {loading ? (
                        <ContentLoader></ContentLoader>
                    ) : (
                        <div
                            className={`cursor-pointer rounded-full w-7 h-7 bg-[#95ED8E] duration-300`}
                            onClick={handleSubmit}
                        >
                            <div className={`relative w-full h-full`}>
                                <div
                                    className={`w-0.5 h-[10px] absolute top-[50%] left-[50%] rotate-45 translate-x-[-50%] translate-y-[calc(-50%+3px)] bg-white`}
                                ></div>
                                <div
                                    className={` w-0.5 h-[10px] absolute top-[50%] left-[50%] rotate-[135deg] translate-x-[-50%] translate-y-[calc(-50%-3px)] bg-white`}
                                ></div>
                            </div>
                        </div>
                    )}
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
                <div className="font-light text-[16px] text-[#525252] select-none">Kontynuuj przez Google</div>
            </div>
        </div>
    );
}

import Image from "next/image";
import ArrowBtn from "@/components/ui/ArrowBtn";
import { currentState } from "../authorized/AuthForm";
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import isEmailValid from "@/lib/isEmailValid";
import ContentLoader from "../ui/ContentLoader";

type DefaultForm = {
    setEmail: Dispatch<SetStateAction<string>>;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
    email: string;
    formActive: boolean;
};

export default function DefaultForm({ setEmail, setCurrentState, email, formActive }: DefaultForm) {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // useEffect(() => {
    //     if (inputRef.current) inputRef.current.focus();
    // }, [inputRef, formActive]);

    async function handleSubmit() {
        setLoading(true);
        if (isEmailValid(email)) {
            setError(false);
            const response = await fetch("/api/checkUser", {
                method: "POST",
                body: JSON.stringify({ email }),
            });

            const data: { isExist: boolean } = await response.json();

            if (data.isExist) setCurrentState("signin");
            else setCurrentState("signup");

            setLoading(false);
        } else {
            setLoading(false);

            setError(true);
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
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    autoFocus
                />
                {loading ? (
                    <div className="relative w-7 h-7">
                        <ContentLoader />
                    </div>
                ) : (
                    <ArrowBtn wrapperClassName="bg-[#95ED8E]" onClick={handleSubmit} isError={error}></ArrowBtn>
                )}
            </div>
            <div className="font-normal text-[15px]">Lub</div>
            <div
                className="flex gap-6 px-5 py-3 items-center bg-[#EFEFEF] rounded-lg cursor-pointer"
                onClick={handleSignIn}
            >
                <Image alt="" src="/images/google.png" width={25} height={25}></Image>
                <div className="font-extralight">Kontynuuj przez Google</div>
            </div>
        </>
    );
}

import ArrowBtn from "@/components/ui/ArrowBtn";
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import ShowPasswordBtn from "../ui/ShowPasswordBtn";
import { currentState } from "./AuthForm";
import { signIn } from "next-auth/react";
import ContentLoader from "../ui/ContentLoader";
import CloseBtn from "../ui/CloseBtn";
import WarningIcon from "../ui/icons/WarningIcon";

type SignInForm = {
    email: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
};

export default function SignInForm({ email, setCurrentState }: SignInForm) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");

    const [isPasswordCorrect, setIsPasswordCorrect] = useState(true)

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        setIsLoading(true);

        setIsPasswordCorrect(true);

        fetch("/api/checkPassword", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.isValid) {
                    signIn("credentials", { authType: "signin", email, password, redirect:false });
                    return;
                }

                setIsPasswordCorrect(false);
                setIsLoading(false);
            });
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") handleSubmit();
    }

    return (
        <>
            <div className="flex gap-5 items-center">
                <CloseBtn position="left" onClick={() => setCurrentState("default")} type="arrow"></CloseBtn>

                <div className="text-[17px] sm:text-[24px] font-semibold leading-none">Zaloguj się na koncie</div>
            </div>
            <div className="text-[10px] sm:text-[13px] font-extralight">za pomocą {email}</div>
            <div className="relative border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px] flex justify-between gap-3">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Wprowadź hasło"
                    className="w-full"
                    value={password}
                    onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                />
                {isLoading ? (
                    <div className="relative w-6 h-6">
                        <ContentLoader></ContentLoader>
                    </div>
                ) : (
                    <ShowPasswordBtn
                        onClick={() => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)}
                        isPasswordVisible={isPasswordVisible}
                    ></ShowPasswordBtn>
                )}
                {!isPasswordCorrect && (
                    <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-5 left-0">
                        <>
                            <WarningIcon />
                            <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                            Nieprawidłowe hasło. Spróbuj jeszcze raz
                            </div>
                        </>
                    </div>
                )}
            </div>
            <button
                className={`${
                    isLoading ? "text-gray-400" : "text-[#61C558]"
                } cursor-pointer font-light text-[15px] select-none`}
                onClick={handleSubmit}
            >
                Zaloguj
            </button>
        </>
    );
}

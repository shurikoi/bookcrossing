import ArrowBtn from "@/components/ui/ArrowBtn";
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import ShowPasswordBtn from "../ui/ShowPasswordBtn";
import { currentState } from "../authorized/AuthForm";
import { signIn } from "next-auth/react";
import ContentLoader from "../ui/ContentLoader";

type SignInForm = {
    email: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
    formActive: boolean;
};

export default function SignInForm({ email, formActive, setCurrentState }: SignInForm) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // useEffect(() => {
    //     if (inputRef.current) inputRef.current.focus();
    // }, [inputRef, formActive]);

    function handleSubmit() {
        setIsLoading(true);
        fetch("/api/checkPassword", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.isValid) {
                    signIn("credentials", { authType: "signin", email, password });
                    return;
                }
                setIsLoading(false);
            });
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") handleSubmit();
    }

    return (
        <>
            <div className="flex gap-5 items-center">
                <ArrowBtn
                    arrowClassName="bg-black"
                    wrapperClassName="rotate-180 scale-150 absolute top-[42px] left-5"
                    onClick={() => setCurrentState("default")}
                ></ArrowBtn>
                <div className="text-2xl font-semibold">Zaloguj się na koncie</div>
            </div>
            <div className="text-[13px] font-extralight">za pomocą {email}</div>
            <div className="border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px] flex justify-between">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Wprowadź hasło"
                    className="outline-none"
                    value={password}
                    onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                    onKeyDown={handleKeyDown}
                    ref={inputRef}
                    autoFocus
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

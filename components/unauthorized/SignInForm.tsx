import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import ShowPasswordBtn from "../ui/buttons/ShowPasswordButton";
import { currentState } from "./AuthForm";
import { signIn } from "next-auth/react";
import ContentLoader from "../ui/loaders/ContentLoader";
import CloseBtn from "../ui/CloseBtn";
import WarningIcon from "../ui/icons/WarningIcon";
import Button from "../ui/buttons/Button";
import ArrowLeftIcon from "../ui/icons/ArrowLeftIcon";
import { useForm } from "../contexts/FormModalProvider";

type SignInForm = {
    email: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
};

export default function SignInForm({ email, setCurrentState }: SignInForm) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");

    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);

    function handleSubmit() {
        setIsLoading(true);

        setIsPasswordValid(true);

        fetch("/api/check-password", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.isValid) {
                    signIn("credentials", { authType: "signin", email, password, redirect: false });
                    return;
                }

                setIsPasswordValid(false);
                setIsLoading(false);
            });
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") handleSubmit();
    }

    return (
        <div className="flex items-center flex-col gap-8 w-full md:max-w-[500px] text-center px-6 py-8 sm:px-14">
            <div className="flex gap-3 flex-col items-center">
                <div className="text-[20px] sm:text-[24px] w-full relative justify-center flex items-center font-medium leading-none">
                    <div className="absolute cursor-pointer -left-6" onClick={() => setCurrentState("default")}>
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </div>
                    <div>Zaloguj się na koncie</div>
                </div>
                <div className="text-[14px] font-extralight">za pomocą {email}</div>
            </div>
            <div className="relative border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px] flex justify-between gap-3">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    autoCapitalize="off"
                    placeholder="Wprowadź hasło"
                    className="w-full"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value.trim());
                    }}
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
                {!isPasswordValid && (
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
            <Button onClick={handleSubmit}>Zaloguj</Button>
        </div>
    );
}

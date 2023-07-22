import ArrowBtn from "@/components/ui/ArrowBtn";
import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import ShowPasswordBtn from "./ui/ShowPasswordBtn";
import { currentState } from "./AuthForm";
import { signIn } from "next-auth/react";

type SignInForm = {
    email: string;
    className?: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
};

export default function SignInForm({ email, className, setCurrentState }: SignInForm) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [password, setPassword] = useState("");

    function handleClick() {
        fetch("/api/checkPassword", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        })
            .then((response) => response.json())
            .then(async (data) => {
                if (data.isValid) signIn("credentials", { authType: "signin", email, password });
            });
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
                />
                <ShowPasswordBtn
                    onClick={() => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)}
                    isPasswordVisible={isPasswordVisible}
                ></ShowPasswordBtn>
            </div>
            <button className="cursor-pointer font-light text-[15px] text-[#61C558] select-none" onClick={handleClick}>
                Zaloguj
            </button>
        </>
    );
}
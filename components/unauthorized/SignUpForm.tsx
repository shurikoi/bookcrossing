import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import ArrowBtn from "@/components/ui/ArrowBtn";
import ShowPasswordBtn from "../ui/ShowPasswordBtn";
import { currentState } from "./AuthForm";
import { signIn } from "next-auth/react";
import CloseBtn from "../ui/CloseBtn";

type SignInForm = {
    email: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
};

export default function SignUpForm({ email, setCurrentState }: SignInForm) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    function handleSubmit() {
        fetch("/api/checkUser", {
            method: "POST",
            body: JSON.stringify({ email }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.isExist) signIn("credentials", { authType: "signup", name, surname, email, password });
            });
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") handleSubmit();
    }

    return (
        <>
            <div className="flex gap-5 items-center">
                <CloseBtn smallScreen onClick={() => setCurrentState("default")} type="arrow"></CloseBtn>
                <div className="text-[17px] sm:text-[24px] font-semibold">Utwórz konto</div>
            </div>
            <div className="text-[10px] sm:text-[13px] font-extralight">tworzysz konto na serwisie BookCrossing za pomocą {email}</div>
            <div className="flex gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Imię"
                    value={name}
                    onInput={(e) => setName((e.target as HTMLInputElement).value)}
                    className="w-full  border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px]"
                    onKeyDown={handleKeyDown}
                />

                <input
                    type="text"
                    name="surname"
                    placeholder="Nazwisko"
                    value={surname}
                    onInput={(e) => setSurname((e.target as HTMLInputElement).value)}
                    className="w-full  border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px]"
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px] flex justify-between w-full gap-3">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Hasło"
                    className="w-full"
                    value={password}
                    onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                    onKeyDown={handleKeyDown}
                />
                <ShowPasswordBtn
                    onClick={() => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)}
                    isPasswordVisible={isPasswordVisible}
                ></ShowPasswordBtn>
            </div>
            <div className="border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px] flex justify-between w-full gap-3">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="cpassword"
                    placeholder="Powtórz hasło"
                    className="w-full"
                    value={cpassword}
                    onInput={(e) => setCpassword((e.target as HTMLInputElement).value)}
                    onKeyDown={handleKeyDown}
                />
                <ShowPasswordBtn
                    onClick={() => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)}
                    isPasswordVisible={isPasswordVisible}
                ></ShowPasswordBtn>
            </div>
            <button className="cursor-pointer font-light text-[15px] text-[#61C558] select-none" onClick={handleSubmit}>
                Zaloguj
            </button>
        </>
    );
}

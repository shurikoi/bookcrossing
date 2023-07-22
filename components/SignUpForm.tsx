import { Dispatch, SetStateAction, useState } from "react";
import ArrowBtn from "@/components/ui/ArrowBtn";
import ShowPasswordBtn from "./ui/ShowPasswordBtn";
import { currentState } from "./AuthForm";
import { signIn } from "next-auth/react";

type SignInForm = {
    className?: string;
    email: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
};

export default function SignUpForm({ className, email, setCurrentState }: SignInForm) {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cpassword, setCpassword] = useState<string>("");

    function handleClick() {
        fetch("/api/checkUser", {
            method: "POST",
            body: JSON.stringify({ email }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.isExist) signIn("credentials", { authType: "signup", name, surname, email, password });
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
                <div className="text-2xl font-semibold">Utwórz konto</div>
            </div>
            <div className="text-[13px] font-extralight">tworzysz konto na serwisie BookCrossing za pomocą {email}</div>
            <div className="flex gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Imię"
                    value={name}
                    onInput={(e) => setName((e.target as HTMLInputElement).value)}
                    className="w-full outline-none border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px]"
                />

                <input
                    type="text"
                    name="surname"
                    placeholder="Nazwisko"
                    value={surname}
                    onInput={(e) => setSurname((e.target as HTMLInputElement).value)}
                    className="w-full outline-none border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px]"
                />
            </div>
            <div className="border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px] flex justify-between w-full">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Hasło"
                    className="outline-none"
                    value={password}
                    onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                />
                <ShowPasswordBtn
                    onClick={() => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)}
                    isPasswordVisible={isPasswordVisible}
                ></ShowPasswordBtn>
            </div>
            <div className="border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px] flex justify-between w-full">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="cpassword"
                    placeholder="Powtórz hasło"
                    className="outline-none"
                    value={cpassword}
                    onInput={(e) => setCpassword((e.target as HTMLInputElement).value)}
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

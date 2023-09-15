import { Dispatch, KeyboardEvent, SetStateAction, useState } from "react";
import ShowPasswordBtn from "../ui/ShowPasswordBtn";
import { currentState } from "./AuthForm";
import { signIn } from "next-auth/react";
import CloseBtn from "../ui/CloseBtn";
import isSignUpDataValid from "@/lib/isSignUpDataValid";
import WarningIcon from "../ui/icons/WarningIcon";

type SignInForm = {
    email: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
};

const errorMessages = {
    length: "Hsfdsf",
    number: "sdfdf",
};

export default function SignUpForm({ email, setCurrentState }: SignInForm) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState({
        name: false,
        surname: false,
        password: {
            length: false,
            number: false,
        },
        hasErrors: false,
    });

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");

    function handleSubmit() {
        setIsLoading(true);

        setErrors({
            name: false,
            surname: false,
            password: {
                length: false,
                number: false,
            },
            hasErrors: false,
        });

        const errors = isSignUpDataValid({ name, surname, password });
        console.log(errors);
        if (errors.hasErrors) {
            setTimeout(() => {
                setErrors(errors);
                setIsLoading(false);
            }, 250);

            return;
        }

        fetch("/api/checkUser", {
            method: "POST",
            body: JSON.stringify({ email }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.isExist)
                    signIn("credentials", { authType: "signup", name, surname, email, password, redirect: false });
            });
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") handleSubmit();
    }

    return (
        <>
            <CloseBtn onClick={() => setCurrentState("default")} type="arrow"></CloseBtn>
            <div className="flex gap-3 flex-col items-center">
                <div className="text-[20px] sm:text-[24px] font-medium leading-none">Utwórz konto</div>
                <div className="text-[14px] font-extralight">
                    tworzysz konto na serwisie BookCrossing za pomocą {email}
                </div>
            </div>

            <div className="flex gap-8 flex-col md:flex-row md:gap-3 w-full">
                <input
                    type="text"
                    name="username"
                    value={email}
                    className="opacity-0 pointer-events-none absolute"
                    tabIndex={0}
                    disabled
                    aria-disabled
                />
                <div className="relative">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Imię"
                        value={name}
                        onInput={(e) => setName((e.target as HTMLInputElement).value)}
                        className="w-full  border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px]"
                        onKeyDown={handleKeyDown}
                    />
                    {errors.name && (
                        <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-5 left-0">
                            <>
                                <WarningIcon />
                                <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                                    Niestety, pole musi się składać z 2-55 znaków
                                </div>
                            </>
                        </div>
                    )}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Nazwisko"
                        value={surname}
                        onInput={(e) => setSurname((e.target as HTMLInputElement).value)}
                        className="w-full  border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px]"
                        onKeyDown={handleKeyDown}
                    />
                    {errors.surname && (
                        <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-5 left-0">
                            <>
                                <WarningIcon />
                                <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                                    Niestety, pole musi się składać z 2-55 znaków
                                </div>
                            </>
                        </div>
                    )}
                </div>
            </div>
            <div className="relative border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px] flex justify-between w-full gap-3">
                <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Hasło"
                    className="w-full"
                    value={password}
                    onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                    onKeyDown={handleKeyDown}
                />
                {Object.values(errors.password).includes(true) && (
                    <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-5 left-0">
                        <>
                            <WarningIcon />
                            <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                                {
                                    // errors.password[0]
                                    errors.password.length && "Hasło musi zawierać minimum 8 znaków"
                                }
                                {errors.password.number && "Hasło musi zawierać cyfry"}
                            </div>
                        </>
                    </div>
                )}
                <ShowPasswordBtn
                    onClick={() => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)}
                    isPasswordVisible={isPasswordVisible}
                ></ShowPasswordBtn>
            </div>
            <div className="border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px] flex justify-between w-full gap-3">
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
            <button
                className={`${isLoading ? "text-gray-400" : "text-[#61C558]"
                    } cursor-pointer font-light text-[15px]  select-none duration-200`}
                onClick={handleSubmit}
            >
                Zaloguj
            </button>
        </>
    );
}

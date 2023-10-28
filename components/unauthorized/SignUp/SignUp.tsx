import { errors, validateUserData } from "@/lib/isUserDataValid";
import { signIn } from "next-auth/react";
import { Dispatch, KeyboardEvent, SetStateAction, useRef, useState } from "react";
import useImagePicker from "../../hooks/useImagePicker";
import ContentLoader from "../../ui/ContentLoader";
import Button from "../../ui/buttons/Button";
import ArrowLeftIcon from "../../ui/icons/ArrowLeftIcon";
import UploadIcon from "../../ui/icons/UploadIcon";
import Input from "./Input";
import { currentState } from "../AuthForm";

interface SignUpProps {
    email: string;
    setFile: Dispatch<SetStateAction<File | undefined>>;
    file: File | undefined;
    setIsImagePreviewActive: Dispatch<SetStateAction<boolean>>;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
}

export default function SignUp({ file, email, setFile, setIsImagePreviewActive, setCurrentState }: SignUpProps) {
    const [isLoading, setIsLoading] = useState(false);

    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);

    const [errors, setErrors] = useState<errors>({
        name: {
            isValid: true,
        },
        surname: {
            isValid: true,
        },
        password: {
            isValid: true,
            errors: {
                length: false,
                number: false,
            },
        },
        hasErrors: false,
    });

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    console.log(inputRef, inputRef.current)
    useImagePicker(inputRef, (e) => {
        const files = e.target.files;

        if (files) {
            setFile(files[0]);
            setIsImagePreviewActive(true);
        }
    });

    function handleSubmit() {
        setErrors({
            name: {
                isValid: true,
            },
            surname: {
                isValid: true,
            },
            password: {
                isValid: true,
                errors: {
                    length: false,
                    number: false,
                },
            },
            hasErrors: false,
        });

        const dataValidation = validateUserData({ name, surname, password });
        setIsConfirmPasswordValid(password == confirmPassword);

        if (dataValidation.hasErrors || password != confirmPassword) {
            setErrors(dataValidation);
            return;
        }

        setIsLoading(true);

        fetch("/api/check-user", {
            method: "POST",
            body: JSON.stringify({ email }),
        })
            .then((response) => response.json())
            .then(async (user) => {
                setIsLoading(false);
                if (user.isExist) return;

                if (file) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        if (e.target) {
                            signIn("credentials", {
                                authType: "signup",
                                name,
                                surname,
                                password,
                                email,
                                imageData: e.target.result,
                                imageName: file?.name,
                                date: new Date(),
                                redirect: false,
                            });
                        }
                    };
                    reader.readAsDataURL(file);
                } else
                    signIn("credentials", {
                        authType: "signup",
                        name,
                        surname,
                        password,
                        email,
                        redirect: false,
                    });
            });
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") handleSubmit();
    }

    return (
        <div className="flex items-center flex-col gap-8 w-full md:max-w-[500px] text-center px-6 py-8 sm:px-10 sm:py-10">
            {/* <CloseBtn onClick={() => setCurrentState("default")} type="arrow"></CloseBtn> */}

            <div className="flex gap-3 flex-col items-center">
                <div
                    className="text-[20px] sm:text-[24px] font-medium leading-none w-full text-center relative"
                    onClick={() => setCurrentState("default")}
                >
                    <div className="absolute left-0 cursor-pointer">
                        <ArrowLeftIcon></ArrowLeftIcon>
                    </div>
                    <div>Utwórz konto</div>
                </div>
                <div className="text-[14px] font-extralight">
                    tworzysz konto na serwisie BookCrossing za pomocą {email}
                </div>
            </div>

            <input
                type="text"
                name="username"
                value={email}
                className="opacity-0 pointer-events-none absolute"
                tabIndex={0}
                disabled
                aria-disabled
            />

            <div className="flex gap-8 flex-col md:flex-row md:gap-3 w-full relative font-extralight">
                <Input
                    placeholder="Imię"
                    setValue={setName}
                    value={name}
                    onKeyDown={handleKeyDown}
                    isRequired={true}
                    isValid={errors.name?.isValid || errors.surname?.isValid}
                    errorMessage={errors.name?.error}
                ></Input>
                <Input
                    placeholder="Nazwisko"
                    setValue={setSurname}
                    value={surname}
                    onKeyDown={handleKeyDown}
                    isRequired={true}
                ></Input>
            </div>

            <Input
                placeholder="Hasło"
                setValue={setPassword}
                value={password}
                isPasswordInput={true}
                onKeyDown={handleKeyDown}
                isRequired={true}
                isValid={errors.password?.isValid}
                errorMessage={errors.password?.error}
            ></Input>

            <Input
                placeholder="Powtórz hasło"
                setValue={setConfirmPassword}
                value={confirmPassword}
                isPasswordInput={true}
                onKeyDown={handleKeyDown}
                isRequired={true}
                isValid={isConfirmPasswordValid}
                errorMessage={"Haslo nie jest poprawne"}
            ></Input>

            <div
                className="relative border-[#61C558] text-[#61C558] border rounded-lg px-4 py-2.5 text-[16px] flex items-center w-full gap-5 font-extralight select-none cursor-pointer"
                onClick={() => inputRef.current?.click()}
            >
                <input type="file" ref={inputRef} accept="image/png, image/jpeg" hidden />
                <UploadIcon></UploadIcon>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {file ? file.name : "Ustaw zdjęcie profilowe"}
                </div>
            </div>
            {isLoading ? (
                <div className="w-6 h-10 relative">
                    <ContentLoader></ContentLoader>
                </div>
            ) : (
                <Button onClick={handleSubmit}>Zaloguj</Button>
            )}
        </div>
    );
}

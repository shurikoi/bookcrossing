import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import ShowPasswordBtn from "../ui/buttons/ShowPasswordBtn";
import { currentState } from "./AuthForm";
import CloseBtn from "../ui/CloseBtn";
import { errors, validateUserData } from "@/lib/isUserDataValid";
import WarningIcon from "../ui/icons/WarningIcon";
import { signIn } from "next-auth/react";
import Button from "../ui/buttons/Button";
import ContentLoader from "../ui/ContentLoader";
import UploadIcon from "../ui/icons/UploadIcon";
import ArrowLeftIcon from "../ui/icons/ArrowLeftIcon";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";

type SignInFormProps = {
    email: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
};

interface InputProps extends React.HTMLAttributes<HTMLElement> {
    errorMessage?: string;
    isPasswordInput?: boolean;
    isRequired?: boolean;
    isValid?: boolean;
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function SignUpForm({ email, setCurrentState }: SignInFormProps) {
    const [isImagePreviewActive, setIsImagePreviewActive] = useState(false);

    const [file, setFile] = useState<File>();

    const [isLoading, setIsLoading] = useState(false);

    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const nodeRef = useRef<HTMLDivElement>(null);

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
                if (!user.isExist) {
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
                }

                setIsLoading(false);
            });
    }

    function handleImageSubmit(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;

        if (files) {
            setFile(files[0]);
            setIsImagePreviewActive(true);
        }
    }

    function handleKeyDown(e: KeyboardEvent) {
        if (e.key == "Enter") handleSubmit();
    }

    return (
        <SwitchTransition mode="out-in">
            <CSSTransition
                key={isImagePreviewActive.toString()}
                nodeRef={nodeRef}
                classNames="fade"
                addEndListener={(done: any) => {
                    if (nodeRef.current) {
                        nodeRef.current.addEventListener("transitionend", done, false);
                    }
                }}
            >
                <div ref={nodeRef} className="">
                    {isImagePreviewActive && file ? (
                        <div className="flex items-center flex-col w-full">
                            <div className="p-3 relative text-center w-full">
                                <div
                                    className="absolute cursor-pointer w-fit"
                                    onClick={() => {
                                        setIsImagePreviewActive(false);
                                        setFile(undefined);
                                    }}
                                >
                                    <ArrowLeftIcon></ArrowLeftIcon>
                                </div>
                                <div>Podgląd</div>
                            </div>
                            <div className="relative">
                                <svg
                                    viewBox="0 0 100 100"
                                    width="100%"
                                    height="100%"
                                    className="absolute pointer-events-none"
                                >
                                    <defs>
                                        <mask id="mask" width="100%" height="100%" x="0" y="0">
                                            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
                                            <circle cx="50%" cy="50%" r="50%" />
                                        </mask>
                                    </defs>
                                    <rect x="0" y="0" width="100%" height="100%" mask="url(#mask)" fillOpacity="0.75" />
                                </svg>
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt=""
                                    className="object-cover aspect-square w-[400px] h-[400px]"
                                />
                            </div>
                            <div className="p-3">
                                <Button onClick={() => setIsImagePreviewActive(false)}>Dalej</Button>
                            </div>
                        </div>
                    ) : (
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
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/png, image/jpeg"
                                    hidden
                                    onChange={handleImageSubmit}
                                />
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
                    )}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
}

function Input({
    isPasswordInput = false,
    isRequired = false,
    isValid = true,
    errorMessage = "",
    placeholder = "",
    value,
    setValue,
    ...props
}: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="relative border-[#61C558] border rounded-lg px-4 py-2.5 flex justify-between w-full gap-3 font-extralight">
            {isRequired && <div className="text-[24px] text-[#61C558] absolute -right-3 -top-3">*</div>}
            <input
                type={isPasswordInput ? (isPasswordVisible ? "text" : "password") : "text"}
                placeholder={placeholder}
                className="w-full"
                value={value}
                onChange={(e) => setValue(e.target.value.trim())}
                onKeyDown={props.onKeyDown}
            />
            {isPasswordInput && (
                <ShowPasswordBtn
                    onClick={() => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)}
                    isPasswordVisible={isPasswordVisible}
                ></ShowPasswordBtn>
            )}
            {!isValid && (
                <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-5 left-0">
                    <>
                        <WarningIcon />
                        <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                            {errorMessage}
                        </div>
                    </>
                </div>
            )}
        </div>
    );
}

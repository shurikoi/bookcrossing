import { useContext, useRef, useState } from "react";
import { FormContext } from "./FormProvider";
import CrossBtn from "@/components/ui/CrossBtn";
import DefaultForm from "./DefaultForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useSession } from "next-auth/react";
import CheckClickOutside from "@/components/checkClickOutside";

export type currentState = "default" | "signin" | "signup";

export default function AuthForm() {
    const { data: session, status } = useSession();

    const { formActive, setFormActive } = useContext(FormContext);
    const [currentState, setCurrentState] = useState<currentState>("default");
    const [email, setEmail] = useState("");

    const states = {
        default: <DefaultForm email={email} setEmail={setEmail} setCurrentState={setCurrentState}></DefaultForm>,
        signin: <SignInForm email={email} setCurrentState={setCurrentState}></SignInForm>,
        signup: <SignUpForm email={email} setCurrentState={setCurrentState}></SignUpForm>,
    };

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <div
            className={`flex items-center justify-center fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  w-screen h-screen bg-black/50  duration-300 transition-opacity  ${
                formActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            <CheckClickOutside elRef={formRef} isActive={formActive} setIsActive={setFormActive}>
                <form
                    ref={formRef}
                    action=""
                    method="POST"
                    className={`relative flex items-center flex-col gap-8 w-[460px] px-14 py-10 bg-white shadow-sm text-center rounded-lg `}
                >
                    <CrossBtn></CrossBtn>
                    {states[currentState]}
                </form>
            </CheckClickOutside>
        </div>
    );
}
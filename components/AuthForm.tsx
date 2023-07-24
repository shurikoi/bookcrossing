import { useContext, useRef, useState } from "react";
import { FormContext } from "./FormProvider";
import CrossBtn from "@/components/ui/CrossBtn";
import DefaultForm from "./DefaultForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import { useSession } from "next-auth/react";
import CheckClickOutside from "@/components/CheckClickOutside";
import ModalMenu from "./ui/ModalMenu";

export type currentState = "default" | "signin" | "signup";

export default function AuthForm() {
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
        <ModalMenu modalActive={formActive} setModalActive={setFormActive} padding="56px 40px">
            <form action="" className="text-center flex items-center flex-col gap-8 w-[460px] ">
                {states[currentState]}
            </form>
        </ModalMenu>
    );
}

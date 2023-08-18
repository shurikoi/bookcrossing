import { FormEvent, useRef, useState } from "react";
import DefaultForm from "./DefaultForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ModalMenu from "./ui/ModalMenu";
import { useForm } from "./contexts/FormContext";

export type currentState = "default" | "signin" | "signup";

export default function AuthForm() {
    const { formActive, setFormActive } = useForm();
    const [currentState, setCurrentState] = useState<currentState>("default");
    const [email, setEmail] = useState("");

    const states = {
        default: <DefaultForm email={email} setEmail={setEmail} setCurrentState={setCurrentState}></DefaultForm>,
        signin: <SignInForm email={email} setCurrentState={setCurrentState}></SignInForm>,
        signup: <SignUpForm email={email} setCurrentState={setCurrentState}></SignUpForm>,
    };

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <ModalMenu modalActive={formActive} setModalActive={setFormActive} style={{padding: "56px 40px"}}>
            <form className="text-center flex items-center flex-col gap-8 w-[460px] " onSubmit={(e : FormEvent) => e.preventDefault()}>
                {states[currentState]}
            </form>
        </ModalMenu>
    );
}

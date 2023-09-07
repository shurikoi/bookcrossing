import { FormEvent, Fragment, useRef, useState } from "react";
import DefaultForm from "./DefaultForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ModalMenu from "../ui/ModalMenu";
import { useForm } from "../contexts/FormContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export type currentState = "default" | "signin" | "signup";

export default function AuthForm() {
    const { formActive, setFormActive } = useForm();
    const [currentState, setCurrentState] = useState<currentState>("default");
    const [email, setEmail] = useState("");

    const states = {
        default: (
            <DefaultForm
                email={email}
                setEmail={setEmail}
                formActive={formActive}
                setCurrentState={setCurrentState}
            ></DefaultForm>
        ),
        signin: <SignInForm email={email} formActive={formActive} setCurrentState={setCurrentState}></SignInForm>,
        signup: <SignUpForm email={email} setCurrentState={setCurrentState}></SignUpForm>,
    };

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
    }

    const nodeRef = useRef<any>(null);

    return (
        <ModalMenu isModalActive={formActive} setIsModalActive={setFormActive}>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={currentState}
                    classNames="fade"
                    addEndListener={(done: any) => {
                        if (nodeRef.current) {
                            nodeRef.current.addEventListener("transitionend", done, false);
                        }
                    }}
                    nodeRef={nodeRef}
                >
                    <form
                        className="text-center flex items-center flex-col gap-8 w-full sm:w-[460px] py-8 px-6 sm:py-14 sm:px-10"
                        onSubmit={handleSubmit}
                        ref={nodeRef}
                    >
                        {states[currentState]}
                    </form>
                </CSSTransition>
            </SwitchTransition>
        </ModalMenu>
    );
}

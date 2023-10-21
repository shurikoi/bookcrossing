import { useRef, useState } from "react";
import DefaultForm from "./DefaultForm";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ModalMenu from "../ui/ModalMenu";
import { useForm } from "../contexts/FormModalProvider";
import { CSSTransition, SwitchTransition } from "react-transition-group";

export type currentState = "default" | "signin" | "signup";

export default function AuthForm() {
    const { formActive, setFormActive } = useForm();
    const [currentState, setCurrentState] = useState<currentState>("default");
    const [email, setEmail] = useState("");
    console.log(email);
    const states = {
        default: <DefaultForm email={email} setEmail={setEmail} setCurrentState={setCurrentState}></DefaultForm>,
        signin: <SignInForm email={email} setCurrentState={setCurrentState}></SignInForm>,
        signup: <SignUpForm email={email} setCurrentState={setCurrentState}></SignUpForm>,
    };

    const nodeRef = useRef<HTMLDivElement>(null);

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
                    <div className="" ref={nodeRef}>
                        {states[currentState]}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </ModalMenu>
    );
}

// flex items-center flex-col gap-8 w-full md:max-w-[500px] text-center px-6 py-8 sm:px-10 sm:py-14

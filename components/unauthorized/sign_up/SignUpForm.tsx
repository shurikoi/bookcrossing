import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import ShowPasswordBtn from "../../ui/buttons/ShowPasswordBtn";
import { currentState } from "../AuthForm";
import CloseBtn from "../../ui/CloseBtn";
import { errors, validateUserData } from "@/lib/isUserDataValid";
import WarningIcon from "../../ui/icons/WarningIcon";
import { signIn } from "next-auth/react";
import Button from "../../ui/buttons/Button";
import ContentLoader from "../../ui/ContentLoader";
import UploadIcon from "../../ui/icons/UploadIcon";
import ArrowLeftIcon from "../../ui/icons/ArrowLeftIcon";
import { CSSTransition, SwitchTransition, TransitionGroup } from "react-transition-group";
import useImagePicker from "../../hooks/useImagePicker";
import SignUp from "./SignUpView";
import ImagePreview from "./ImagePreview";

type SignInFormProps = {
    email: string;
    setCurrentState: Dispatch<SetStateAction<currentState>>;
};

export default function SignUpForm({ email, setCurrentState }: SignInFormProps) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isImagePreviewActive, setIsImagePreviewActive] = useState(false);
    const [file, setFile] = useState<File>();
    const nodeRef = useRef<HTMLDivElement>(null);

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
                        <ImagePreview
                            file={file}
                            setFile={setFile}
                            setIsActive={setIsImagePreviewActive}
                        ></ImagePreview>
                    ) : (
                        <SignUp
                            file={file}
                            name={name}
                            surname={surname}
                            password={password}
                            confirmPassword={confirmPassword}
                            setName={setName}
                            setSurname={setSurname}
                            setPassword={setPassword}
                            setConfirmPassword={setConfirmPassword}
                            setCurrentState={setCurrentState}
                            email={email}
                            setFile={setFile}
                            setIsImagePreviewActive={setIsImagePreviewActive}
                        ></SignUp>
                    )}
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
}

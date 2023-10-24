import ModalMenu from "../../ui/ModalMenu";
import { Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from "react";
import { publication } from "../Main";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import TelegramIcon from "../../ui/icons/TelegramIcon";
import SnapchatIcon from "../../ui/icons/SnapchatIcon";
import MessengerIcon from "../../ui/icons/MessengerIcon";
import InstagramIcon from "../../ui/icons/InstagramIcon";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";

export type publicationData = {
    title: string;
    author: string;
    category: string;
    description: string;
    language: string;
    state: string;
    imageName: string;
    imageData: string;
    messenger: messenger;
    messengerDescription: string;
    date: Date;
};

interface messengers {
    [key: string]: {
        name: messenger;
        icon: JSX.Element;
    };
}

export const messengers: messengers = {
    Telegram: { name: "Telegram", icon: <TelegramIcon /> },
    Snapchat: { name: "Snapchat", icon: <SnapchatIcon /> },
    Messenger: { name: "Messenger", icon: <MessengerIcon /> },
    Instagram: { name: "Instagram", icon: <InstagramIcon /> },
};

export type messenger = "Telegram" | "Snapchat" | "Messenger" | "Instagram" | string;

interface PublicationMenuProps {
    setBooks: Dispatch<SetStateAction<publication[]>>;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export type image =
    | {
          name: string | undefined;
          data: string | undefined;
      }
    | undefined;

export default function PublicationMenu({ setBooks, isModalActive, setIsModalActive }: PublicationMenuProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const [publicationData, setPublicationData] = useState<publicationData>();

    const [file, setFile] = useState<File>();

    const [isBackgroundClickPrevented, setIsBackgroundClickPrevented] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    const [image, setImage] = useState<image>();

    useLayoutEffect(() => {
        setIsBackgroundClickPrevented(true);

        if (file)
            setImage({
                name: file.name,
                data: URL.createObjectURL(file),
            });

        setTimeout(() => {
            setIsBackgroundClickPrevented(false);
        }, 600);
    }, [file]);

    const steps = [
        <StepOne setFile={setFile} setCurrentStep={setCurrentStep}></StepOne>,
        <StepTwo
            image={image}
            publicationData={publicationData}
            setPublicationData={setPublicationData}
            setCurrentStep={setCurrentStep}
        ></StepTwo>,
        <StepThree
            image={image}
            file={file}
            setFile={setFile}
            setBooks={setBooks}
            setPublicationData={setPublicationData}
            setIsModalActive={setIsModalActive}
            publicationData={publicationData}
            setCurrentStep={setCurrentStep}
        ></StepThree>,
    ];
    const nodeRef = useRef<any>(null);
    return (
        <>
            {isBackgroundClickPrevented && (
                <div
                    ref={overlayRef}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className="z-50 w-screen h-screen fixed top-0 left-0 preventedClick"
                ></div>
            )}
            <ModalMenu fullMode isModalActive={isModalActive} setIsModalActive={setIsModalActive}>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={currentStep}
                        classNames="fade"
                        nodeRef={nodeRef}
                        addEndListener={(done: any) => {
                            if (nodeRef.current) {
                                nodeRef.current.addEventListener("transitionend", done, false);
                            }
                        }}
                    >
                        <div ref={nodeRef}>{steps[currentStep]}</div>
                    </CSSTransition>
                </SwitchTransition>
            </ModalMenu>
        </>
    );
}
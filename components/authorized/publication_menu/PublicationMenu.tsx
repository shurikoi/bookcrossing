import ModalMenu from "../../ui/ModalMenu";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
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
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export type image =
    | {
          name: string | undefined;
          data: string | undefined;
      }
    | undefined;

export default function PublicationMenu({ isModalActive, setIsModalActive }: PublicationMenuProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const [publicationData, setPublicationData] = useState<publicationData>();

    const [file, setFile] = useState<File>();

    const [image, setImage] = useState<image>();

    useEffect(() => {
        if (file) {
            setImage({
                name: file.name,
                data: URL.createObjectURL(file),
            });
        }
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
            setPublicationData={setPublicationData}
            setIsModalActive={setIsModalActive}
            publicationData={publicationData}
            setCurrentStep={setCurrentStep}
        ></StepThree>,
    ];
    const nodeRef = useRef<any>(null);
    return (
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
                    <div className="h-full md:h-auto" ref={nodeRef}>
                        {steps[currentStep]}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </ModalMenu>
    );
}

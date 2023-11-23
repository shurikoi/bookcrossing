import ModalMenu from "../../ui/ModalMenu";
import { Dispatch, SetStateAction, useLayoutEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import TelegramIcon from "../../ui/icons/TelegramIcon";
import SnapchatIcon from "../../ui/icons/SnapchatIcon";
import MessengerIcon from "../../ui/icons/MessengerIcon";
import InstagramIcon from "../../ui/icons/InstagramIcon";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";

export type publicationData = {
  title: string;
  author: string;
  category: string;
  description: string;
  language: string;
  state: string;
  image: string;
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

  useLayoutEffect(() => {
    if (file) {
      setImage({
        name: file.name,
        data: URL.createObjectURL(file),
      });
    }
  }, [file]);

  const header =
    currentStep > 0 ? (
      <div className="w-full p-3 relative text-center">
        <div className="absolute cursor-pointer w-fit" onClick={() => setCurrentStep((step) => step - 1)}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </div>
        <div>{currentStep == 1 ? `${currentStep + 1} / 3` : "Podgląd"}</div>
      </div>
    ) : undefined;

  const steps = [
    <StepOne key={"StepOne"} setFile={setFile} setCurrentStep={setCurrentStep}></StepOne>,
    <StepTwo
      key={"StepTwo"}
      image={image}
      publicationData={publicationData}
      setPublicationData={setPublicationData}
      setCurrentStep={setCurrentStep}
    ></StepTwo>,
    <StepThree
      key={"StepThree"}
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
    <ModalMenu fullMode isModalActive={isModalActive} header={header} setIsModalActive={setIsModalActive}>
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

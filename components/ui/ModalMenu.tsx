"use client";

import { Dispatch, SetStateAction, memo, useEffect, useRef } from "react";
import { useScreen } from "../contexts/ScreenProvider";
import useClickOutside from "../hooks/useClickOutside";
import MobileModalMenu from "./MobileModalMenu";
import CloseButton from "./buttons/CloseButton";
import { useModal } from "../contexts/ModalProvider";

interface ModalMenuProps {
  children: React.ReactNode;
  isModalActive: boolean;
  fullMode?: boolean;
  isTouchMoveAllowed?: boolean;
  header?: React.ReactNode;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  ref?: React.RefObject<HTMLDivElement>;
  callback?: () => void;
}

const ModalMenu = memo(
  ({
    fullMode = false,
    children,
    isModalActive,
    isTouchMoveAllowed,
    setIsModalActive,
    header,
    callback = () => null,
    ref,
  }: ModalMenuProps) => {
    const triggerRef = useRef<HTMLDivElement>(null);

    const { isSmallScreen } = useScreen();

    const { addModalToActive, removeModalFromActive } = useModal();

    useClickOutside(triggerRef, () => {
      if (!isModalActive) return;
      setIsModalActive(false);
      callback();
    });

    useEffect(() => {
      if (!triggerRef || !triggerRef.current) return;

      if (isModalActive) addModalToActive(triggerRef.current);
      else removeModalFromActive(triggerRef.current);
    }, [isModalActive, triggerRef, children]);

    return (
      <>
        {isSmallScreen ? (
          <MobileModalMenu
            fullMode={fullMode}
            isModalActive={isModalActive}
            setIsModalActive={setIsModalActive}
            header={header}
            isTouchMoveAllowed={isTouchMoveAllowed}
            triggerRef={triggerRef}
            callback={callback}
          >
            {children}
          </MobileModalMenu>
        ) : (
          <div
            className={`fixed left-0 top-0 w-screen h-screen sm:flex items-center justify-center duration-300 transition-opacity z-10 ${
              isModalActive ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"
            } `}
            ref={ref}
          >
            <div
              className={`absolute top-0 left-0 w-screen h-screen bg-black/40  duration-300 transition-opacity`}
            ></div>
            <div ref={triggerRef} className={`relative bg-white shadow-sm rounded-lg duration-300 transition-opacity `}>
              <CloseButton onClick={() => setIsModalActive(false)}></CloseButton>
              {children}
            </div>
          </div>
        )}
      </>
    );
  }
);

ModalMenu.displayName = "ModalMenu";

export default ModalMenu;

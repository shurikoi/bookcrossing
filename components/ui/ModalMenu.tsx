import { Dispatch, SetStateAction, useRef, memo, useState, useEffect } from "react";
import CloseBtn from "./CloseBtn";
import useClickOutside from "../hooks/useClickOutside";
import MobileModalMenu from "./MobileModalMenu";
import { useScreen } from "../contexts/ScreenProvider";

interface ModalMenuProps {
    children: React.ReactNode;
    isModalActive: boolean;
    fullMode?: boolean;
    header?: React.ReactNode;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
    ref?: React.RefObject<HTMLDivElement>;
    callback?: () => void;
}

const ModalMenu = function ModalMenu({
    fullMode = false,
    children,
    isModalActive,
    setIsModalActive,
    header,
    callback = () => null,
    ref,
}: ModalMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    
    const { isSmallScreen } = useScreen();
    
    useClickOutside(menuRef, () => {
        if (!isModalActive) return;
        callback();
        setIsModalActive(false);
        document.body.style.overflow = "auto";
    });

    return (
        <>
            {isSmallScreen ? (
                <MobileModalMenu
                    fullMode={fullMode}
                    isModalActive={isModalActive}
                    setIsModalActive={setIsModalActive}
                    header={header}
                    menuRef={menuRef}
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
                    <div
                        ref={menuRef}
                        className={`relative bg-white shadow-sm rounded-lg duration-300 transition-opacity `}
                    >
                        <CloseBtn onClick={() => setIsModalActive(false)}></CloseBtn>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalMenu;

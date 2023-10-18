import { Dispatch, SetStateAction, useRef, memo, useState, useEffect } from "react";
import CloseBtn from "./CloseBtn";
import useClickOutside from "../hooks/useClickOutside";
import MobileModalMenu from "./MobileModalMenu";
import { useScreen } from "../contexts/ScreenProvider";

interface ModalMenuProps {
    children: React.ReactNode;
    isModalActive: boolean;
    fullMode?: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
    ref? : React.RefObject<HTMLDivElement>
    callback? : () => void
}

const ModalMenu = memo(function ModalMenu({
    fullMode = false,
    children,
    isModalActive,
    setIsModalActive,
    callback = () => null,
    ref
}: ModalMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    const { isSmallScreen } = useScreen();

    useClickOutside(menuRef, () => {
        callback()
        setIsModalActive(false);
    });

    return (
        <>
            {isSmallScreen ? (
                <MobileModalMenu
                    fullMode={fullMode}
                    isModalActive={isModalActive}
                    setIsModalActive={setIsModalActive}
                    menuRef={menuRef}
                >
                    {children}
                </MobileModalMenu>
            ) : (
                <div
                    className={`fixed left-0 top-0 w-screen h-screen sm:flex items-center justify-center duration-300 transition-opacity ${
                        isModalActive ? "opacity-100 pointer-events-all z-10" : "opacity-0 pointer-events-none"
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
});

export default ModalMenu;

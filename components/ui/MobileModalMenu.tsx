import { Dispatch, SetStateAction, memo, useState, useEffect, HTMLAttributes, useRef } from "react";
import CloseBtn from "./CloseBtn";

interface ModalMenuProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
    menuRef: React.RefObject<HTMLDivElement>;
}

const MobileModalMenu = memo(function MobileModalMenu({
    children,
    isModalActive,
    setIsModalActive,
    menuRef,
}: ModalMenuProps) {
    const [menuYPosition, setMenuYPosition] = useState(0);
    const [startPosition, setStartPosition] = useState(0);

    useEffect(() => {
        function updateMenuPosition(e: TouchEvent) {
            const touchY = e.touches[0].clientY - startPosition;
            if (menuRef.current) {
                menuRef.current.classList.remove("duration-200");

                if (menuRef.current?.clientHeight - menuYPosition <= menuRef.current?.clientHeight && touchY > 0)
                    setMenuYPosition(touchY);
                else 
                    setMenuYPosition(0);
            }
        }

        function updateStartPosition(e: TouchEvent) {
            const touchY = e.touches[0].clientY;

            setStartPosition(touchY);
        }

        function handleTouchEnd(e: TouchEvent) {
            if (menuRef.current) {
                menuRef.current.classList.add("duration-200");
            }

            setMenuYPosition(0);

            if (menuRef.current && menuYPosition > 100) {
                setIsModalActive(false);
            }
        }

        if (menuRef.current) {
            menuRef.current.addEventListener("touchstart", updateStartPosition);
            menuRef.current.addEventListener("touchmove", updateMenuPosition);
            menuRef.current.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            if (menuRef.current) {
                menuRef.current.removeEventListener("touchmove", updateMenuPosition);
                menuRef.current.removeEventListener("touchstart", updateStartPosition);
                menuRef.current.removeEventListener("touchend", handleTouchEnd);
            }
        };
    }, [menuYPosition, startPosition]);

    useEffect(() => {
        if (isModalActive) {
            setMenuYPosition(0);
        }
    }, [isModalActive]);

    return (
        <>
            <div
                className={`${
                    isModalActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                } fixed top-0 left-0 w-screen duration-200 h-screen bg-black/40`}
            ></div>
            <div
                className={`${
                    isModalActive ? "bottom-0 touch-none" : "bottom-[-100%] touch-auto"
                } fixed w-full h-fit bottom-0 left-0 bg-white p-8 rounded-t-xl duration-200`}
                ref={menuRef}
                style={{ transform: `translateY(${menuYPosition}px)` }}
            >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/4 bg-gray-400 rounded-full h-1"></div>
                <div className="text-center font-head text-2xl leading-none font-medium">BookCrossing</div>
                {children}
            </div>
        </>
    );
});

export default MobileModalMenu;

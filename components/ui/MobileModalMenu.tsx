import { Dispatch, SetStateAction, memo, useState, useEffect, HTMLAttributes, useRef } from "react";
import CloseBtn from "./CloseBtn";

interface ModalMenuProps extends HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
    fullMode?: boolean;
    callback?: () => void;
    menuRef: React.RefObject<HTMLDivElement>;
}

const MobileModalMenu = memo(function MobileModalMenu({
    children,
    isModalActive,
    setIsModalActive,
    fullMode = false,
    menuRef,
    callback = () => null,
}: ModalMenuProps) {
    const [menuYPosition, setMenuYPosition] = useState(0);
    const [startPosition, setStartPosition] = useState(0);

    useEffect(() => {
        if (fullMode) return;

        function updateMenuPosition(e: TouchEvent) {
            const clientY = e.touches[0].clientY - startPosition;

            if (menuRef.current) {
                if (menuRef.current.clientHeight - menuYPosition <= menuRef.current.clientHeight && clientY > 0)
                    setMenuYPosition(clientY);
                else setMenuYPosition(0);
            }
        }

        function updateStartPosition(e: TouchEvent) {
            const clientY = e.touches[0].clientY;

            menuRef.current?.classList.remove("duration-200");

            setStartPosition(clientY);
        }

        function handleTouchEnd(e: TouchEvent) {
            menuRef.current?.classList.add("duration-200");

            if (menuRef.current && menuYPosition > 100) {
                setIsModalActive(false);
            } else {
                setMenuYPosition(0);
            }
        }

        if (menuRef.current) {
            menuRef.current?.addEventListener("touchstart", updateStartPosition);
            menuRef.current?.addEventListener("touchmove", updateMenuPosition);
            menuRef.current?.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            menuRef.current?.removeEventListener("touchstart", updateStartPosition);
            menuRef.current?.removeEventListener("touchmove", updateMenuPosition);
            menuRef.current?.removeEventListener("touchend", handleTouchEnd);
        };
    }, [startPosition, menuYPosition, window]);
    console.log(isModalActive);
    useEffect(() => {
        console.log(isModalActive);
        if (isModalActive) {
            setMenuYPosition(0);

            document.body.style.overflow = "hidden";
        } else if (!isModalActive) document.body.style.overflow = "auto";
    }, [isModalActive]);

    return (
        <>
            <div
                className={`${
                    isModalActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                } fixed top-0 left-0 w-screen duration-200 h-screen bg-black/40 z-10`}
            ></div>

            <div
                className={`${isModalActive ? "bottom-0" : "bottom-[-100%]"} ${
                    fullMode ? "h-full" : "rounded-t-xl"
                } fixed left-0 w-full bg-white duration-200 z-10`}
                ref={menuRef}
                style={{ transform: `translateY(${menuYPosition}px)` }}
            >
                <div className="flex flex-col gap-5 h-full w-full overflow-y-auto scroll">
                    {children}
                    {fullMode ? (
                        <div
                            className="absolute right-6 top-3 select-none cursor-pointer"
                            onClick={() => {
                                callback();
                                setIsModalActive(false);
                            }}
                        >
                            X
                        </div>
                    ) : (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/4 bg-gray-400 rounded-full h-1"></div>
                    )}
                </div>
            </div>
        </>
    );
});

export default MobileModalMenu;

import { Dispatch, SetStateAction, useRef, memo, useState, useEffect } from "react";
import CloseBtn from "./CloseBtn";
import useClickOutside from "../hooks/useClickOutside";
import MobileModalMenu from "./MobileModalMenu";

interface ModalMenuProps {
    children: React.ReactNode;
    isModalActive: boolean;
    fullMode?: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

const ModalMenu = memo(function ModalMenu({
    fullMode = false,
    children,
    isModalActive,
    setIsModalActive,
}: ModalMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        checkScreenSize();

        function checkScreenSize() {
            setIsSmallScreen(window.innerWidth < 768);
        }

        window.addEventListener("resize", checkScreenSize);
    }, []);

    useClickOutside(menuRef, () => {
        setIsModalActive(false);
    });

    return (
        <>
            {isSmallScreen ? (
                <MobileModalMenu fullMode={fullMode} isModalActive={isModalActive} setIsModalActive={setIsModalActive} menuRef={menuRef}>
                    {children}
                </MobileModalMenu>
            ) : (
                <div
                    className={`${
                        isModalActive ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"
                    } fixed left-0 top-0 w-screen h-screen sm:flex items-center justify-center duration-300 transition-opacity z-50`}
                >
                    <div
                        className={`absolute top-0 left-0 w-screen h-screen bg-black/40  duration-300 transition-opacity  `}
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

import { Dispatch, SetStateAction, useRef, memo, useState, useEffect } from "react";
import CloseBtn from "./CloseBtn";
import useClickOutside from "../hooks/useClickOutside";

interface ModalMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
    smallScreen?: boolean;
}

const ModalMenu = memo(({ children, isModalActive, setIsModalActive, ...props }: ModalMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [menuYPosition, setMenuYPosition] = useState(0);

    useEffect(() => {
        checkScreenSize();

        function checkScreenSize() {
            setIsSmallScreen(window.innerWidth < 640);
        }

        window.addEventListener("resize", checkScreenSize);
    }, []);

    useEffect(() => {
        function updateMenuPosition(e: TouchEvent) {
            const touchY = e.touches[0].clientY;
            
            if (menuRef.current) {
                // if (menuYPosition < menuRef.current?.clientHeight / 2) setIsModalActive(false);

                if (menuRef.current.clientHeight > window.innerHeight - touchY) setMenuYPosition(touchY);
            }
        }

        if (isSmallScreen && menuRef.current) {
            menuRef.current.addEventListener("touchmove", updateMenuPosition);
        }
        return () => {
            if (menuRef.current) menuRef.current.removeEventListener("touchmove", updateMenuPosition);
        };
    }, [menuYPosition, isSmallScreen]);

    useClickOutside(menuRef, () => {
        setIsModalActive(false);
    });

    return (
        <>
            {isSmallScreen ? (
                <div
                    className={`${
                        isModalActive ? "bottom-0" : "bottom-[-100%]"
                    } fixed w-full h-fit bottom-0 left-0 bg-white p-8 duration-200 rounded-t-xl touch-none`}
                    ref={menuRef}
                    style={{ transform: `translate(${menuYPosition}px)` }}
                >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/4 bg-gray-400 rounded-full h-1"></div>
                    <CloseBtn type="arrow" smallScreen setMenuActive={setIsModalActive}></CloseBtn>
                    <div className="text-center font-head text-2xl font-medium">BookCrossing</div>
                    {children}
                </div>
            ) : (
                <div
                    className={`${
                        isModalActive ? "opacity-100 pointer-events-all" : "opacity-0 pointer-events-none"
                    } fixed left-0 top-0 w-screen h-screen sm:flex items-center justify-center duration-300 transition-opacity z-50`}
                >
                    <div
                        className={`absolute top-0 left-0 w-screen h-screen bg-black/50  duration-300 transition-opacity  `}
                    ></div>
                    <div
                        ref={menuRef}
                        className={`relative bg-white shadow-sm rounded-lg duration-300 transition-opacity `}
                        {...props}
                    >
                        <CloseBtn setMenuActive={setIsModalActive}></CloseBtn>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
});

export default ModalMenu;

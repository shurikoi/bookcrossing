import { Dispatch, SetStateAction, memo, useState, useEffect, HTMLAttributes, useRef } from "react";

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

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function updateMenuPosition(e: TouchEvent) {
            if ((scrollRef.current && scrollRef.current.scrollTop > 0) || startPosition == 0) return;

            const clientY = e.touches[0].clientY - startPosition;
            if (scrollRef.current && clientY > 1) scrollRef.current.style.overflow = "hidden";

            if (menuRef.current) {
                if (clientY > 0) setMenuYPosition(clientY);
                else setMenuYPosition(0);
            }
        }

        function updateStartPosition(e: TouchEvent) {
            if (scrollRef.current && scrollRef.current.scrollTop > 0) return;

            if (scrollRef.current)
                scrollRef.current.onscroll = (e) => {
                    setStartPosition(0);
                    if (scrollRef.current) scrollRef.current.onscroll = null;
                };

            const clientY = e.touches[0].clientY;

            menuRef.current?.classList.remove("duration-200");

            setStartPosition(clientY);
        }

        function handleTouchEnd(e: TouchEvent) {
            menuRef.current?.classList.add("duration-200");
            if (scrollRef.current) scrollRef.current.style.removeProperty("overflow");

            if (menuYPosition > 100) {
                callback();
                setIsModalActive(false);
                setTimeout(() => {
                    document.body.style.overflow = "auto";
                }, 100);
            } else {
                setStartPosition(0);
                setMenuYPosition(0);
            }
        }

        if (menuRef.current) {
            menuRef.current?.addEventListener("touchstart", updateStartPosition, { passive: true });
            menuRef.current?.addEventListener("touchmove", updateMenuPosition, { passive: true });
            menuRef.current?.addEventListener("touchend", handleTouchEnd, { passive: true });
        }

        return () => {
            menuRef.current?.removeEventListener("touchstart", updateStartPosition);
            menuRef.current?.removeEventListener("touchmove", updateMenuPosition);
            menuRef.current?.removeEventListener("touchend", handleTouchEnd);
        };
    }, [startPosition, menuYPosition, window]);

    // useEffect(() => {
    //     if (!!bookId) document.body.style.overflow = "hidden";
    //     else if (!bookId) document.body.style.overflow = "auto";
    // }, [bookId]);

    useEffect(() => {
        console.log(isModalActive, menuRef);
        if (isModalActive) {
            setMenuYPosition(0);
            document.body.style.overflow = "hidden";
        }
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
                    fullMode ? "h-[100dvh]" : "rounded-t-xl"
                } fixed left-0 w-full bg-white duration-200 z-20 `}
                ref={menuRef}
                style={{ transform: `translateY(${menuYPosition}px)` }}
            >
                <div className="flex flex-col h-full w-full ">
                    {fullMode ? (
                        <div className="flex justify-end w-full select-none z-10">
                            <div
                                className="cursor-pointer p-3"
                                onClick={() => {
                                    callback();
                                    setIsModalActive(false);
                                    setTimeout(() => {
                                        document.body.style.overflow = "auto";
                                    }, 100);
                                }}
                            >
                                X
                            </div>
                        </div>
                    ) : (
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/4 bg-gray-400 rounded-full h-1"></div>
                    )}
                    <div className="overflow-y-auto h-full" ref={scrollRef}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
});

export default MobileModalMenu;

import { Dispatch, HTMLAttributes, SetStateAction, memo, useEffect, useRef, useState } from "react";

interface ModalMenuProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isModalActive: boolean;
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  header?: React.ReactNode;
  fullMode?: boolean;
  isTouchMoveAllowed?: boolean;
  callback?: () => void;
  triggerRef: React.RefObject<HTMLDivElement>;
}

const MobileModalMenu = memo(
  ({
    children,
    isModalActive,
    setIsModalActive,
    header,
    isTouchMoveAllowed = true,
    fullMode = false,
    triggerRef,
    callback = () => null,
  }: ModalMenuProps) => {
    const [menuYPosition, setMenuYPosition] = useState(0);
    const [startPosition, setStartPosition] = useState(0);

    const scrollRef = useRef<HTMLDivElement>(null);

    function handleClose() {
      callback();

      setIsModalActive(false);
    }

    function updateStartPosition(e: TouchEvent) {
      if (scrollRef.current && scrollRef.current.scrollTop > 0) return;
      const clientY = e.touches[0].clientY;

      triggerRef.current?.classList.remove("duration-200");

      setStartPosition(clientY);
    }

    function updateMenuPosition(e: TouchEvent) {
      if ((scrollRef.current && scrollRef.current.scrollTop > 0) || startPosition == 0) return;

      const clientY = e.touches[0].clientY - startPosition;

      if (clientY > 0 && e.cancelable) {
        e.preventDefault();
        e.stopPropagation();

        if (scrollRef.current) scrollRef.current.style.overflow = "hidden";

        setMenuYPosition(clientY);
      } else {
        setMenuYPosition(0);
      }
    }

    function handleTouchEnd() {
      triggerRef.current?.classList.add("duration-200");

      if (scrollRef.current) scrollRef.current.style.removeProperty("overflow");

      if (menuYPosition > 100) handleClose();
      else {
        setStartPosition(0);
        setMenuYPosition(0);
      }
    }

    useEffect(() => {
      triggerRef.current?.addEventListener("touchstart", updateStartPosition);
      triggerRef.current?.addEventListener("touchmove", updateMenuPosition);

      return () => {
        triggerRef.current?.removeEventListener("touchstart", updateStartPosition);
        triggerRef.current?.removeEventListener("touchmove", updateMenuPosition);
      };
    }, [startPosition]);

    useEffect(() => {
      triggerRef.current?.addEventListener("touchend", handleTouchEnd, { passive: true });

      return () => {
        triggerRef.current?.removeEventListener("touchend", handleTouchEnd);
      };
    }, [menuYPosition]);

    useEffect(() => {
      if (isModalActive) {
        setMenuYPosition(0);
        setStartPosition(0);
      }
    }, [isModalActive, children]);

    return (
      <>
        <div
          className={`${
            isModalActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          } fixed top-0 left-0 w-screen duration-200 h-screen bg-black/40 z-10 touch-none`}
        ></div>

        <div
          className={`${isModalActive ? "bottom-0" : "-bottom-full"} ${
            fullMode ? "h-[100dvh]" : "rounded-t-xl"
          } fixed left-0 w-full bg-white duration-200 z-10`}
          ref={triggerRef}
          style={{ transform: `translateY(${menuYPosition}px)` }}
        >
          <div className="flex flex-col h-full w-full ">
            {fullMode ? (
              <div className="flex items-center justify-center w-full select-none z-10 p-3 h-[3em]">
                {header && <>{header}</>}
                <div className="absolute right-3 cursor-pointer p-3" onClick={handleClose}>
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
  }
);

MobileModalMenu.displayName = "MobileModalMenu";

export default MobileModalMenu;

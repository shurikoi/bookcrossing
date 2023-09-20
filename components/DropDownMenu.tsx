import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import useClickOutside from "./hooks/useClickOutside";

interface DropDownMenuProps {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
    animation?: {
        start: string;
        end: string;
    };
    children: React.ReactNode;
    menuRef?: RefObject<HTMLDivElement>
}

const defaultAnimation = {
    start: "opacity-100 pointer-events-auto",
    end: "opacity-0 pointer-events-none",
};

export default function DropDownMenu({
    isMenuActive,
    setIsMenuActive,
    animation = defaultAnimation,
    menuRef,
    children,
}: DropDownMenuProps) {
    const ref = menuRef || useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => {
        setIsMenuActive(false);
    });

    return (
        <div ref={ref} className={`${isMenuActive ? animation.start : animation.end} duration-200`}>
            {children}
        </div>
    );
}

import { Dispatch, RefObject, SetStateAction, useRef } from "react";
import useClickOutside from "./hooks/useClickOutside";

interface DropDownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
    animation?: {
        active: string;
        inactive: string;
    };
    children: React.ReactNode;
    menuRef?: RefObject<HTMLDivElement>;
    elRef?: RefObject<HTMLDivElement>;
}

const defaultAnimation = {
    active: "opacity-100 pointer-events-auto",
    inactive: "opacity-0 pointer-events-none",
};

export default function DropDownMenu({
    isMenuActive,
    setIsMenuActive,
    animation = defaultAnimation,
    menuRef,
    children,
    className,
    style,
    elRef,
}: DropDownMenuProps) {
    const ref = menuRef || useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => {
        setIsMenuActive(false);
    });

    return (
        <div
            ref={menuRef ? (elRef ? elRef : ref) : ref}
            className={`${isMenuActive ? animation.active : animation.inactive} z-10 duration-200 ${className || ""}`}
            style={style}
        >
            {children}
        </div>
    );
}

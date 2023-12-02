import { Dispatch, RefObject, SetStateAction, memo } from "react";
import useClickOutside from "../hooks/useClickOutside";

interface DropDownMenuProps extends React.HTMLAttributes<HTMLDivElement> {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
    animation?: {
        active: string;
        inactive: string;
    };
    children: React.ReactNode;
    triggerRef: RefObject<HTMLDivElement>;
    elRef?: RefObject<HTMLDivElement>;
}

const defaultAnimation = {
    active: "opacity-100 pointer-events-auto",
    inactive: "opacity-0 pointer-events-none",
};

const DropDownMenu = memo(
    ({
        isMenuActive,
        setIsMenuActive,
        animation = defaultAnimation,
        triggerRef,
        children,
        className,
        style,
        elRef,
    }: DropDownMenuProps) => {
        useClickOutside(triggerRef, () => {
            setIsMenuActive(false);
        });

        return (
            <div
                ref={triggerRef ? (elRef ? elRef : triggerRef) : triggerRef}
                className={`${isMenuActive ? animation.active : animation.inactive} z-40 duration-200 transition-opacity ${
                    className || ""
                }`}
                style={style}
            >
                {children}
            </div>
        );
    }
);

DropDownMenu.displayName = "DropDownMenu"

export default DropDownMenu
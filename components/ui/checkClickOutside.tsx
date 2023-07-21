import { useEffect, RefObject } from "react";
import { Dispatch, SetStateAction } from "react";

type checkClickOutside = {
    elRef: RefObject<HTMLElement>;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    isActive: boolean;
    children: React.ReactNode
};

export default function checkClickOutside({elRef, setIsActive, isActive, children} : checkClickOutside) {
    useEffect(() => {
        console.log(elRef, isActive, setIsActive, children)
        if (!isActive) return;

        function checkClickOutside(e: MouseEvent) {
            if (!elRef?.current?.contains(e.target as HTMLElement)) {
                setIsActive(false);
            }
        }

        document.addEventListener("mouseup", checkClickOutside);

        return () => {
            document.removeEventListener("mouseup", checkClickOutside);
        };
    }, [setIsActive, isActive, elRef]);

    return children
}

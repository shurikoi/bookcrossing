import { useEffect, RefObject } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        function checkClickOutside(e: MouseEvent) {
            if (!ref?.current?.contains(e.target as HTMLElement)) {
                callback();
            }
        }

        document.addEventListener("mouseup", checkClickOutside);

        return () => {
            document.removeEventListener("mouseup", checkClickOutside);
        };
    }, [callback, ref]);
}

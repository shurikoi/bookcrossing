import { useEffect, RefObject } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        function checkClickOutside(e: MouseEvent) {
            const target = e.target as HTMLElement;

            if (!ref.current?.contains(target)) callback();
        }

        document.addEventListener("mouseup", checkClickOutside);

        return () => {
            document.removeEventListener("mouseup", checkClickOutside);
        };
    }, [callback, ref]);
}

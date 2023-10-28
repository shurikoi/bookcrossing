import { useEffect, RefObject, useLayoutEffect } from "react";

export default function useClickOutside(ref: RefObject<HTMLElement>, callback: () => void) {
    useLayoutEffect(() => {
        function checkClickOutside(e: MouseEvent) {
            const target = e.target as HTMLElement;

            if (!ref.current?.contains(target) && !target.classList.contains("preventedClick")) callback();
        }

        document.addEventListener("mouseup", checkClickOutside);

        return () => {
            document.removeEventListener("mouseup", checkClickOutside);
        };
    }, [callback, ref]);
}

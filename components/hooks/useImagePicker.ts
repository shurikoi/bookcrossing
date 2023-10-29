import { RefObject, useCallback, useEffect, useLayoutEffect, useState } from "react";

export default function useImagePicker(ref: RefObject<HTMLInputElement>, callback?: (e: any) => void) {
    useEffect(() => {
        const div = document.createElement("div");

        div.className = "preventedClick z-50 opacity-0 fixed top-0 left-0 w-screen h-screen";

        function handleChange(e: any) {
            
            if (callback) callback(e);
        }

        function handleClick(e: any) {
            window.addEventListener("focus", handleFocus);

            document.body.appendChild(div);
        }

        function handleFocus(e: any) {
            setTimeout(() => {
                div.remove();
            }, 1000);

            window.removeEventListener("focus", handleFocus);
        }

        if (ref.current) {
            ref.current.addEventListener("change", handleChange);
            ref.current.addEventListener("click", handleClick);
        }

        return () => {
            if (ref.current) {
                ref.current.removeEventListener("change", handleChange);
                ref.current.removeEventListener("click", handleClick);
            }
        };
    }, [ref, ref.current]);
}

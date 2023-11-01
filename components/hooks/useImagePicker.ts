import { RefObject, useEffect, useState } from "react";

export default function useImagePicker(ref: RefObject<HTMLInputElement>, callback?: (e: any) => void) {
    const [file, setFile] = useState<File>()

    useEffect(() => {
        const div = document.createElement("div");

        div.className = "preventedClick z-50 opacity-0 fixed top-0 left-0 w-screen h-screen";

        function handleChange(e: any) {
            setTimeout(() => {
                div.remove();
            }, 1000);

            setFile(e.target.files[0])

            if (callback) callback(e);
        }

        function handleClick(e: any) {
            if (window.innerWidth >= 768) {
                window.addEventListener("focus", handleFocus);

                document.body.appendChild(div);
            }
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

    return file
}

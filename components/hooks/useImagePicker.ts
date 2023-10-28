import { RefObject, useCallback, useEffect, useLayoutEffect, useState } from "react";



export default function useImagePicker(ref: RefObject<HTMLInputElement>, callback?: (e: any) => void) {
    const [file, setFile] = useState<File>();

    useEffect(() => {
        const div = document.createElement("div");

        div.className = "preventedClick z-50 opacity-0 fixed top-0 left-0 w-screen h-screen";
        console.log(ref);
        if (!file) div.remove() 

        function handleChange(e: any) {
            const files = e.target.files;
            if (files[0]) {
                setFile(files[0]);
            }
            if (callback) callback(e);

            setTimeout(() => {
                div.remove();
            }, 1000);
        }

        function handleClick(e: any) {
            console.log("prevented");
            document.body.appendChild(div);
        }

        if (ref.current) {
            ref.current.addEventListener("change", handleChange);
            ref.current.addEventListener("click", handleClick);
        }

        // return () => {
        //     if (ref.current) {
        //         ref.current.removeEventListener("change", handleChange);
        //         ref.current.removeEventListener("click", handleClick);
        //     }
        // };
    }, [ref, ref.current]);
}

import { RefObject, useLayoutEffect, useState } from "react";

export default function useImagePicker(ref: RefObject<HTMLInputElement>, callback?: () => void) {
    const [image, setImage] = useState("");
    const [isClickPrevented, setIsClickPrevented] = useState(false);

    useLayoutEffect(() => {
        function handleChange(e: any) {
            if (callback) callback();
            else {
                const files = e.target.files;
                if (files[0]) setImage(files[0]);
            }

            // function handleImagePush(e: ChangeEvent<HTMLInputElement> | DragEvent) {
            //     e.preventDefault();

            //     const files = (e as DragEvent).dataTransfer?.files ?? (e as ChangeEvent<HTMLInputElement>).target?.files;

            //     if (files) {
            //         if (files[0]) {
            //             setFile(files[0]);
            //             setCurrentStep(1);
            //         }
            //     }
            // }

            setTimeout(() => {
                setIsClickPrevented(false);
            }, 1000);
        }

        function handleClick(e: any) {
            setIsClickPrevented(true);
        }

        if (ref.current) {
            ref.current.addEventListener("change", handleChange);
            ref.current.addEventListener("click", handleClick);
        }

        return () => {};
    }, [callback, ref.current]);

    if (callback) return { image, isClickPrevented };
    else return { isClickPrevented };
}

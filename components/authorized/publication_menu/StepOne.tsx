import useImagePicker from "@/components/hooks/useImagePicker";
import Button from "@/components/ui/buttons/Button";
import PhotosIcon from "@/components/ui/icons/PhotosIcon";
import { ChangeEvent, Dispatch, DragEvent, SetStateAction, useEffect, useRef, useState } from "react";

interface StepOneProps {
    setFile: Dispatch<SetStateAction<File | undefined>>;
    setCurrentStep: Dispatch<SetStateAction<number>>;
}

export default function StepOne({ setFile, setCurrentStep }: StepOneProps) {
    const fileRef = useRef<HTMLInputElement>(null);

    const [isWindowHovered, setIsWindowHovered] = useState(false);

    useEffect(() => {
        function handleDragStart() {
            setIsWindowHovered(true);
        }

        function handleDragEnd(e: any) {
            if (!e.relatedTarget) setIsWindowHovered(false);
        }

        window.addEventListener("dragenter", handleDragStart);
        window.addEventListener("dragleave", handleDragEnd);

        return () => {
            window.removeEventListener("dragenter", handleDragStart);
            window.removeEventListener("dragleave", handleDragEnd);
        };
    }, []);

    function openFileMenu() {
        if (fileRef.current) fileRef.current.click();
    }

    useImagePicker(fileRef, (e) => {
        e.preventDefault();

        const files = e.target.files;

        if (files) {
            if (files[0]) {
                setFile(files[0]);
                setCurrentStep(1);
            }
        }
    });

    function handleDrop(e: DragEvent) {
        const files = e.dataTransfer.files;

        if (files) {
            if (files[0]) {
                setFile(files[0]);
                setCurrentStep(1);
            }
        }
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

    return (
        <>
            <div
                className={`flex flex-col rounded-lg items-center w-fit gap-16 px-[110px] py-[72px] duration-200 ${
                    isWindowHovered ? "bg-[#e4e4e4]" : "bg-white"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <div className="font-light text-[17px]">Opublikuj książkę</div>
                <PhotosIcon></PhotosIcon>
                <div className="flex flex-col items-center gap-6">
                    <div className="font-extralight text-[14px]">Przeciągnij zjęcie tutaj</div>
                    <Button onClick={openFileMenu}>Albo wybierz ręcznie</Button>
                    <input ref={fileRef} type="file" accept="image/png, image/jpeg" hidden />
                </div>
            </div>
        </>
    );
}

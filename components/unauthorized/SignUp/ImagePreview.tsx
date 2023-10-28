import { Dispatch, SetStateAction } from "react";
import Button from "../../ui/buttons/Button";
import ArrowLeftIcon from "../../ui/icons/ArrowLeftIcon";

interface ImagePreviewProps {
    setIsActive: Dispatch<SetStateAction<boolean>>;
    setFile: Dispatch<SetStateAction<File | undefined>>;
    file: File;
}

export default function ImagePreview({ file, setIsActive, setFile }: ImagePreviewProps) {
    return (
        <div className="flex items-center flex-col w-full">
            <div className="p-3 relative text-center w-full">
                <div
                    className="absolute cursor-pointer w-fit"
                    onClick={() => {
                        setIsActive(false);
                        setFile(undefined);
                    }}
                >
                    <ArrowLeftIcon></ArrowLeftIcon>
                </div>
                <div>Podgląd</div>
            </div>
            <div className="relative">
                <svg viewBox="0 0 100 100" width="100%" height="100%" className="absolute pointer-events-none">
                    <defs>
                        <mask id="mask" width="100%" height="100%" x="0" y="0">
                            <rect x="0" y="0" width="100%" height="100%" fill="#fff" />
                            <circle cx="50%" cy="50%" r="50%" />
                        </mask>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" mask="url(#mask)" fillOpacity="0.75" />
                </svg>
                <img
                    src={URL.createObjectURL(file)}
                    alt=""
                    className="object-cover aspect-square w-[400px] h-[400px]"
                />
            </div>
            <div className="p-3">
                <Button onClick={() => setIsActive(false)}>Dalej</Button>
            </div>
        </div>
    );
}

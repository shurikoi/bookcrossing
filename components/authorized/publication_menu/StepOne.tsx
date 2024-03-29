import useImagePicker from "@/components/hooks/useImagePicker";
import Button from "@/components/ui/buttons/Button";
import PhotosIcon from "@/components/ui/icons/PhotosIcon";
import getExtension from "@/lib/getExtension";
import { allowedImageTypes } from "@/lib/variables";
import { Dispatch, DragEvent, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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

  function handleSubmit(files: FileList) {
    if (files[0]) {
      const extension = getExtension(files[0].name);

      if (extension && allowedImageTypes.includes(extension.toLowerCase())) setFile(files[0]);
    }
  }

  const { file, pickImage } = useImagePicker();

  function handleDrop(e: DragEvent) {
    e.preventDefault();

    const files = e.dataTransfer.files;

    handleSubmit(files);
  }

  useEffect(() => {
    if (file) setFile(file);
  }, [file]);

  return (
    <div
      className={`flex flex-col rounded-lg items-center gap-16 justify-center top-0 h-screen absolute 2md:h-full 2md:relative w-full 2md:w-fit 2md:px-[110px] 2md:py-[72px] duration-200 ${
        isWindowHovered ? "bg-[#e4e4e4]" : "bg-white"
      }`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className="select-none font-light text-[17px]">Opublikuj książkę</div>
      <PhotosIcon></PhotosIcon>
      <div className="flex flex-col items-center gap-6">
        <div className="select-none font-extralight text-[14px]">Przeciągnij zdjęcie tutaj</div>
        <Button onClick={pickImage}>Albo wybierz ręcznie</Button>
      </div>
    </div>
  );
}

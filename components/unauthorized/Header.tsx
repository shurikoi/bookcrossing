import TextSlider from "@/components/ui/TextSlider";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import GetStartedButton from "../ui/buttons/GetStartedButton";

export default function Header({ setIsFormActive }: { setIsFormActive: Dispatch<SetStateAction<boolean>> }) {
  const heroText: string[] = ["Czytaj", "Odkrywaj", "Doświadczaj", "Opiniuj", "Wymieniaj się", "Przyjaźniaj się"];

  return (
    <header className="flex flex-col gap-[210px] pt-9 px-10 pb-4 relative box-border">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-0 items-center justify-between">
        <div className="text-3xl text-white font-head">BookCrossing</div>
        <GetStartedButton setIsFormActive={setIsFormActive}></GetStartedButton>
      </div>
      <TextSlider text={heroText}></TextSlider>
      <div className="flex justify-center sm:justify-end">
        <div className="flex gap-1">
          <span className="text-white/40">zdjęcie</span>
          <span className="text-white/80">pexels.com</span>
        </div>
      </div>
      <Image src="/images/header.png" alt="" className="bg-[black] object-cover -z-10" priority fill></Image>
    </header>
  );
}

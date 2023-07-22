import TextSlider from "@/components/ui/TextSlider";
import GetStartedBtn from "./ui/GetStartedBtn";

export default function Header() {
    const heroText: string[] = ["Czytaj", "Odkrywaj", "Doświadczaj", "Opiniuj", "Wymieniaj się", "Przyjaźniaj się"];

    return (
        <header className="bg-[black] flex flex-col gap-[210px] pt-9 px-10 pb-4 relative box-border bg-no-repeat bg-cover bg-center bg-[url(/images/header.png)]">
            <div className="flex items-center justify-between">
                <div className="text-3xl text-white font-head">BookCrossing</div>
                <GetStartedBtn></GetStartedBtn>
            </div>
            <TextSlider text={heroText} duration={2000}></TextSlider>
            <div className="flex">
                <div className="flex gap-1 ml-auto">
                    <span className="text-white/40">zdjęcie</span>
                    <span className="text-white/80">pexels.com</span>
                </div>
            </div>
        </header>
    );
}

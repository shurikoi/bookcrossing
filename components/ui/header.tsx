import TextSlider from "@/components/ui/textSlider";

export default function Header() {
    const heroText: string[] = [
        "Czytaj",
        "Odkrywaj",
        "Doświadczaj",
        "Opiniuj",
        "Wymieniaj się",
        "Przyjaźniaj się",
    ];

    return (
        <header className="bg-[black] flex flex-col gap-[210px] pt-9 px-10 pb-4 relative box-border bg-no-repeat bg-cover bg-center bg-[url(http://localhost:3000/images/header.png)]">
            <div className="flex justify-between items-center">
                <div className="text-white text-3xl">BookCrossing</div>
                <div className="group">
                    <div className="bg-[#00FF0A] rounded-2xl px-7 py-2.5 font-semibold transition duration-200 group-hover:translate-y-[-3px] cursor-pointer">
                        Get Started
                    </div>
                </div>
            </div>
            <TextSlider text={heroText} duration={2000}></TextSlider>
            <div className="flex">
                <div className="ml-auto flex gap-1">
                    <span className="text-white/40">zdjęcie</span>
                    <span className="text-white/80">pexels.com</span>
                </div>
            </div>
        </header>
    );
}

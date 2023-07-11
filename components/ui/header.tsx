"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
    const heroText: string[] = [
        "Czytaj",
        "Odkrywaj",
        "Doświadczaj",
        "Opiniuj",
        "Wymieniaj się",
        "Przyjaźniaj się",
    ];

    const [selectedHeroText, setSelectedHeroText] = useState<number>(0);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        setInterval(() => {
            setSelectedHeroText((currentIndex: number) => {
                console.log(currentIndex, heroText.length)
                if (currentIndex == heroText.length) {
                    setIsEnd(true)
                    return 0;
                };

                return currentIndex + 1;
            });
        }, 1000);
    }, []);

    useEffect(() => {
        if (isEnd) {
            setTimeout(() => {
                setIsEnd(false);
            }, 300);
        }
    }, [isEnd]);

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
            <div className="text-white text-3xl text-center h-[36px] overflow-hidden">
                <div
                    style={{
                        transform: `translateY(${-36 * selectedHeroText}px)`,
                        transition: isEnd? "0ms" : "300ms",
                    }}
                >
                    {heroText.map((text) => (
                        <div key={text} className="">
                            {text}
                        </div>
                    ))}
                    <div className="">{heroText[0]}</div>
                </div>
            </div>
            <div className="flex">
                <div className="ml-auto flex gap-1">
                    <span className="text-white/40">zdjęcie</span>
                    <span className="text-white/80">pexels.com</span>
                </div>
            </div>
        </header>
    );
}

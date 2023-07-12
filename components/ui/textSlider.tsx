"use client"

import { useEffect, useState } from "react";

export default function TextSlider({ text, duration }: { text: string[], duration: number }) {
    const [selectedText, setSelectedText] = useState<number>(0);
    const [isEnd, setIsEnd] = useState<boolean>(false);

    useEffect(() => {
        setInterval(() => {
            setSelectedText((selectedText: number) => {
                if (selectedText == text.length) {
                    setIsEnd(true);
                    return 0;
                }

                return selectedText + 1;
            });
        }, duration);
    }, []);

    useEffect(() => {
        if (isEnd) {
            setTimeout(() => {
                setIsEnd(false);
                setSelectedText((selectedText: number) => {
                    return selectedText + 1;
                });
            }, 1);
        }
    }, [isEnd]);

    return (
        <div className="text-white text-3xl text-center h-[36px] overflow-hidden">
            <div
                style={{
                    transform: `translateY(${-36 * selectedText}px)`,
                    transition: isEnd ? "0ms" : "300ms",
                }}
            >
                {text.map((text) => (
                    <div key={text} className="">
                        {text}
                    </div>
                ))}
                <div className="">{text[0]}</div>
            </div>
        </div>
    );
}

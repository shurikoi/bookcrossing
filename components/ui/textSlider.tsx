"use client";

import { useEffect, useState } from "react";

type textSlider = {
    text: string[];
    duration?: number;
    height?: number;
};

export default function TextSlider({ text, duration = 2000, height = 36 }: textSlider) {
    const [selectedText, setSelectedText] = useState(0);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setSelectedText((selectedText) => {
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
                setSelectedText((selectedText) => {
                    return selectedText + 1;
                });
            }, 1);
        }
    }, [isEnd]);

    return (
        <div
            style={{ fontSize: `${height}px`, height: `${height * 1.25}px` }}
            className={`text-white leading-tight text-center overflow-hidden select-none`}
        >
            <div
                style={{
                    transform: `translateY(${-height * 1.25 * selectedText}px)`,
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

"use client";

import { useLayoutEffect, useState } from "react";

type textSlider = {
  text: string[];
  duration?: number;
  height?: number;
};

export default function TextSlider({ text, duration = 1000, height = 36 }: textSlider) {
  const [selectedText, setSelectedText] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useLayoutEffect(() => {
    let interval = setInterval(
      () => {
        setSelectedText((selectedText) => selectedText + 1);

        if (selectedText + 1 > text.length) {
          setIsEnd(true);
        }

        if (selectedText >= text.length) {
          setSelectedText(0);
        }
      },
      isEnd ? 100 : duration
    );

    return () => {
      clearInterval(interval);
    };
  }, [selectedText, isEnd]);

  useLayoutEffect(() => {
    if (isEnd) {
      setTimeout(() => {
        setIsEnd(false);
      }, 100);
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

import { MouseEventHandler } from "react";
import CrossIcon from "./icons/CrossIcon";
import ArrowIcon from "./icons/ArrowIcon";

interface CloseBtnProps {
    onClick: MouseEventHandler;
    type?: "cross" | "arrow";
}

export default function CloseBtn({ onClick, type = "cross" }: CloseBtnProps) {
    const CloseBtn = {
        cross: {
            icon: <CrossIcon></CrossIcon>,
            style: "right-0 top-0 translate-x-[calc(100%+10px)] w-8 h-8",
        },
        arrow: {
            icon: <ArrowIcon></ArrowIcon>,
            style: "left-8 top-8 w-6 h-6 2sm:top-14",
        },
    };

    return (
        <div className={`${CloseBtn[type].style} absolute rounded-full cursor-pointer`} onClick={onClick}>
            {CloseBtn[type].icon}
        </div>
    );
}

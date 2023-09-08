import { MouseEventHandler } from "react";
import CrossIcon from "./icons/CrossIcon";
import ArrowIcon from "./icons/ArrowIcon";

interface CloseBtnProps {
    onClick: MouseEventHandler;
    position?: "right" | "left";
    type?: "cross" | "arrow";
}

export default function CloseBtn({ onClick, position = "right", type = "cross" }: CloseBtnProps) {
    const CloseBtn = {
        cross: <CrossIcon></CrossIcon>,
        arrow: <ArrowIcon></ArrowIcon>,
    };

    const style = {
        right: "right-0 top-0 translate-x-[calc(100%+10px)] w-8 h-8",
        left: "left-8 top-8 w-6 h-6 2sm:top-14",
    };

    return (
        <div className={`${style[position]} absolute rounded-full cursor-pointer`} onClick={onClick}>
            {CloseBtn[type]}
        </div>
    );
}

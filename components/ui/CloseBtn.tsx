import { Dispatch, SetStateAction, useContext } from "react";
import CrossIcon from "./icons/CrossIcon";
import ArrowIcon from "./icons/ArrowIcon";

interface CloseBtnProps {
    setMenuActive: Dispatch<SetStateAction<boolean>>;
    smallScreen?: boolean;
    type?: "cross" | "arrow";
}

export default function CloseBtn({ setMenuActive, smallScreen, type = "cross" }: CloseBtnProps) {
    const CloseBtn = {
        cross: <CrossIcon></CrossIcon>,
        arrow: <ArrowIcon></ArrowIcon>,
    };

    return (
        <div
            className={`${
                smallScreen ? "left-8 top-8 w-6 h-6" : "right-0 top-0 translate-x-[calc(100%+10px)] w-8 h-8"
            } absolute rounded-full cursor-pointer`}
            onClick={() => setMenuActive(false)}
        >
           { CloseBtn[type]}
        </div>
    );
}

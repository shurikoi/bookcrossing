import { MouseEventHandler } from "react";

type arrowBtn = {
    wrapperClassName?: string;
    arrowClassName?: string;
    isError?: boolean;
    onClick?: MouseEventHandler;
}

export default function arrowBtn({
    wrapperClassName = "bg-transparent",
    arrowClassName = "bg-white",
    onClick,
    isError,
}: arrowBtn) {
    const errorColor = "bg-[#8a2a2a]";

    return (
        <div className={`cursor-pointer rounded-full w-7 h-7 ${wrapperClassName}${isError ? errorColor : ""} duration-300`} onClick={onClick}>
            <div className={`relative w-full h-full`}>
                <div
                    className={`w-0.5 h-[10px] absolute top-[50%] left-[50%] rotate-45 translate-x-[-50%] translate-y-[calc(-50%+3px)]  ${arrowClassName}`}
                ></div>
                <div
                    className={` w-0.5 h-[10px] absolute top-[50%] left-[50%] rotate-[135deg] translate-x-[-50%] translate-y-[calc(-50%-3px)] ${arrowClassName}`}
                ></div>
            </div>
        </div>
    );
}

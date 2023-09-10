import { MouseEventHandler } from "react";

type arrowBtn = {
    onClick?: MouseEventHandler;
};

export default function arrowBtn({ onClick }: arrowBtn) {
    return (
        <div className={`cursor-pointer rounded-full w-7 h-7 bg-[#95ED8E] duration-300`} onClick={onClick}>
            <div className={`relative w-full h-full`}>
                <div
                    className={`w-0.5 h-[10px] absolute top-[50%] left-[50%] rotate-45 translate-x-[-50%] translate-y-[calc(-50%+3px)] bg-white`}
                ></div>
                <div
                    className={` w-0.5 h-[10px] absolute top-[50%] left-[50%] rotate-[135deg] translate-x-[-50%] translate-y-[calc(-50%-3px)] bg-white`}
                ></div>
            </div>
        </div>
    );
}

import { useState } from "react";
import Loader from "./ContentLoader";
import dateConjugation from "@/lib/dateConjugation";
import { memo } from "react";
import { publication } from "../authorized/Main";

interface BookProps {
    data: publication;
    handleClick?: () => void;
}

const Book = memo(({ data, handleClick }: BookProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <div className="relative">
            <div
                className="relative w-60 h-72 bg-black font-inter shadow-[0px_0px_15px_1px_rgba(0,0,0,.5)] hover:scale-[1.04] hover:shadow-[0px_0px_30px_1px_rgba(0,0,0,.5)] cursor-pointer will-change-transform duration-200 flex-shrink-0"
                onClick={handleClick}
                onMouseEnter={() => setIsMouseOver(true)}
                onMouseLeave={() => setIsMouseOver(false)}
            >
                <div
                    className={`flex flex-col justify-between h-full p-5 duration-200 ${
                        isMouseOver ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                    }`}
                >
                    <div className="text-[#CDCDCD] text-[17px] font-normal cursor-text w-fit">
                        {dateConjugation(data.date)}
                    </div>
                    <div>
                        <div
                            className="font-medium text-[21px] text-white overflow-hidden text-ellipsis cursor-text w-fit max-w-full whitespace-nowrap "
                            title={data.title}
                        >
                            {data.title}
                        </div>
                        <div
                            className="text-[#CDCDCD] text-[18px] font-normal overflow-hidden text-ellipsis cursor-text w-fit max-w-full min-h-[1.5em] "
                            title={data.author}
                        >
                            {data.author}
                        </div>
                    </div>
                    <div
                        className={`bg-black/40 duration-200 absolute w-full h-full left-0 top-0 text-white flex items-center justify-center z-[-1]`}
                    ></div>
                </div>
                {isImageLoaded || isImageLoading ? (
                    <img
                        src={data.image || ""}
                        alt=""
                        className={`object-cover w-full h-full absolute top-0 left-0 -z-10`}
                        onLoad={() => {
                            setIsImageLoaded(true);
                            setIsImageLoading(false);
                        }}
                        onError={() => {
                            setIsImageLoaded(false);
                            setIsImageLoading(false);
                        }}
                    />
                ) : (
                    !isImageLoaded &&
                    !isImageLoading && (
                        <div className="absolute text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            No Image
                        </div>
                    )
                )}
                {isImageLoading && (
                    <div className="absolute flex justify-center items-center w-full h-full top-0 left-0">
                        <Loader></Loader>
                    </div>
                )}
            </div>
            <img
                title={data.ownerData.name + " " + data.ownerData.surname}
                src={data.ownerData.avatar}
                className={`absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-14 h-14 rounded-full bg-gray-500 duration-300 ${
                    isMouseOver ? "opacity-0" : "opacity-100"
                }`}
            ></img>
        </div>
    );
});

export default Book;

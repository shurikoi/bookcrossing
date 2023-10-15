import { useState } from "react";
import Loader from "./ContentLoader";
import convertDate from "@/lib/convertDate";
import { memo } from "react";
import { publication } from "../authorized/Main";

// interface bookData {
//     author: string;
//     title: string;
//     image: string;
//     date: string;
// }

interface BookProps {
    data: publication;
    handleClick?: () => void;
}

const Book = memo(({ data, handleClick }: BookProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    const [isMouseOver, setIsMouseOver] = useState(false);

    return (
        <div
            className="relative rounded-lg w-60 h-72 bg-black font-inter shadow-[0px_0px_15px_1px_rgba(0,0,0,.5)] hover:scale-[1.03] hover:shadow-[0px_0px_30px_1px_rgba(0,0,0,.5)] cursor-pointer will-change-transform duration-200 flex-shrink-0 overflow-hidden"
            onClick={handleClick}
            onMouseEnter={() => setIsMouseOver(true)}
            onMouseLeave={() => setIsMouseOver(false)}
        >
            <div
                className={`flex flex-col justify-between h-full p-5 duration-200 ${
                    isMouseOver ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
                }`}
            >
                <div className="text-[#CDCDCD] text-[17px] font-normal cursor-text w-fit">{convertDate(data.date)}</div>
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
                    className={` ${
                        isImageLoaded ? "bg-black/40" : "bg-black duration-0"
                    }  duration-200 absolute w-full h-full left-0 top-0 text-white flex items-center justify-center z-[-1]`}
                >
                    {!isImageLoaded && !isImageLoading && "No Image"}
                </div>
            </div>
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
            {isImageLoading && (
                <div className="absolute flex justify-center items-center w-full h-full top-0 left-0">
                    <Loader></Loader>
                </div>
            )}
        </div>
    );
});

export default Book;

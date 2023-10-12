import { useState } from "react";
import Loader from "./ContentLoader";
import convertDate from "@/lib/convertDate";
import { memo } from "react";
import { bookData } from "../authorized/Main";

interface BookProps {
    data: bookData;
    handleClick?: () => void;
}

const Book = memo(({ data, handleClick }: BookProps) => {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    return (
        <div
            className="relative flex flex-col rounded-lg justify-between p-5 w-60 h-72 bg-black font-inter shadow-[0px_0px_15px_1px_rgba(0,0,0,.5)] hover:scale-[1.03] hover:shadow-[0px_0px_30px_1px_rgba(0,0,0,.5)] cursor-pointer will-change-transform duration-200 flex-shrink-0 overflow-hidden"
            onClick={handleClick}
        >
            <div className="text-[#CDCDCD] text-[17px] font-normal cursor-text w-fit">{convertDate(data.date)}</div>
            <div>
                <div className="font-medium text-[21px] text-white overflow-hidden text-ellipsis cursor-text w-fit max-w-full whitespace-nowrap">
                    {data.title}
                </div>
                <div
                    className="text-[#CDCDCD] text-[18px] font-normal overflow-hidden text-ellipsis cursor-text w-fit max-w-full h-[1em] leading-none"
                    title={data.author}
                >
                    {data.author}
                </div>
            </div>
            <div
                className={` ${isImageLoaded ? "bg-black/30" : "bg-black duration-0"
                    }  duration-200 absolute w-full h-full left-0 top-0 text-white flex items-center justify-center z-[-1]`}
            >
                {!isImageLoaded && !isImageLoading && <>No Image</>}
            </div>
            <img
                src={data.image || ""}
                alt=""
                className="-z-10 object-cover w-full h-full absolute top-0 left-0"
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

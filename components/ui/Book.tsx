import Image from "next/image";
import { MouseEventHandler, useState } from "react";
import Loader from "../PageLoader";

interface Book {
    title: string;
    author: string;
    image: string;
    date: string;
    onClick?: MouseEventHandler;
}

export default function Book({ title, author, date, image, onClick }: Book) {
    const [isImageLoaded, setIsImageLoaded] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    console.log(title);
    return (
        <div
            className="relative flex flex-col justify-between p-5 w-60 h-72 bg-black rounded-2xl font-inter shadow-md shadow-black/50 cursor-pointer hover:-translate-y-1 will-change-transform duration-200 flex-shrink-0 overflow-hidden"
            // style={{ background: `${isHovered ? "linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))," : "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),"} url("${image}") center / cover  no-repeat`}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <div className="text-[#CDCDCD] text-[17px] font-normal cursor-text w-fit">{date}</div>
            <div>
                <div
                    className="font-medium text-[21px] text-white overflow-hidden text-ellipsis cursor-text w-fit max-w-full"
                    title={title}
                >
                    {title}
                </div>
                <div
                    className="text-[#CDCDCD] text-[18px] font-normal overflow-hidden text-ellipsis cursor-text w-fit max-w-full h-[1em] leading-none"
                    title={author}
                >
                    {author}
                </div>
            </div>
            <div
                className={` ${
                    isImageLoaded ? `${isHovered ? "bg-transparent" : "bg-black/20"}` : "bg-black"
                }  duration-200 absolute w-full h-full left-0 top-0 text-white flex items-center justify-center z-[-1]`}
            >
                {!isImageLoaded && <>No Image</>}
            </div>
            <Image
                src={image}
                fill={true}
                objectFit="cover"
                alt="123"
                className="-z-10"
                quality={100}
                onLoad={() => setIsImageLoaded(true)}
                onErrorCapture={(e) => setIsImageLoaded(false)}
            ></Image>
        </div>
    );
}

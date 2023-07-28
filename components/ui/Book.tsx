import { MouseEventHandler } from "react";

interface Book {
    title: string;
    author: string;
    image: string;
    date: string;
    onClick?: MouseEventHandler
} 

export default function Book({ title, author, date, image, onClick}: Book) {
    return (
        <div
            className="relative flex flex-col justify-between p-5 w-60 h-72 bg-black rounded-2xl bg-cover bg-no-repeat bg-center font-inter shadow-md shadow-black/50 cursor-pointer hover:shadow-black hover:-translate-y-1 will-change-transform duration-200 flex-shrink-0" style={{backgroundImage: `url("${image}")`}} onClick={onClick}
        >
            <div className="text-[#CDCDCD] text-[17px] font-normal cursor-text w-fit">{date}</div>
            <div>
                <div className="font-medium text-[21px] text-white overflow-hidden text-ellipsis cursor-text w-fit" title={title}>{title}</div>
                <div className="text-[#CDCDCD] text-[18px] font-normal overflow-hidden text-ellipsis cursor-text w-fit" title={author}>{author}</div>
            </div>
        </div>
    );
}

import { CSSProperties } from "react";

type Book = {
    title: string;
    author: string;
    image: string;
    date: string;
};

export default function Book({ title, author, date, image}: Book) {
    return (
        <div
            className={`relative flex flex-col justify-between p-5 w-60 h-72 bg-black rounded-2xl bg-cover bg-no-repeat bg-center font-inter shadow-md shadow-black/50`} style={{backgroundImage: `url(${image})`}}
        >
            <div className="text-[#CDCDCD] text-[17px] font-normal">{date}</div>
            <div>
                <div className="font-medium text-[21px] text-white overflow-hidden text-ellipsis">{title}</div>
                <div className="text-[#CDCDCD] text-[18px] font-normal overflow-hidden text-ellipsis">{author}</div>
            </div>
        </div>
    );
}

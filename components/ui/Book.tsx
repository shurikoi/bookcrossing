import Image from "next/image";
import {Inter} from "next/font/google"

const inter = Inter({
    subsets: ["latin"],
    weight: ["500", "400"]
})

type Book = {
    title: string,
    author: string,
    date: string
}

export default function Book({title, author, date} : Book) {
    return (
        <div className={`relative flex flex-col justify-between p-5 bg-black w-60 h-72 rounded-2xl bg-[url(/images/book.png)] bg-cover bg-no-repeat bg-center ${inter.className}`}>
            <div className="text-[#CDCDCD] text-lg font-normal">{date}</div>
            <div>
                <div className='font-medium text-2xl text-white'>{title}</div>
                <div className="text-[#CDCDCD] text-lg font-normal">{author}</div>
            </div>
        </div>
    );
}

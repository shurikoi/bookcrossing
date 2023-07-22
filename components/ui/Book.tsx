import Image from "next/image";
import {Inter} from "next/font/google"

const inter = Inter({
    subsets: ["latin"],
    weight: ["500", "400"]
})

export default function Book() {
    return (
        <div className={`relative flex flex-col justify-between p-5 bg-black w-60 h-72 rounded-2xl bg-[url(/images/book.png)] bg-cover bg-no-repeat bg-center ${inter.className}`}>
            <div className="text-[#CDCDCD] text-lg font-normal">Dzisiaj</div>
            <div>
                <div className='font-medium text-2xl text-white'>Big Mac</div>
                <div className="text-[#CDCDCD] text-lg font-normal">Serhij Żadan</div>
            </div>
        </div>
    );
}

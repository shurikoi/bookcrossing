import Image from "next/image";
import GetStartedBtn from "./GetStartedBtn";
import { eUkraine } from "./fonts";

export default function GetStarted() {
    return (
        <div className="flex flex-col items-center gap-[70px] px-[70px] 2md:px-[230px] py-[75px] font-medium text-[20px]">
            <div className="text-center text-[25px] font-medium">Zobacz jak zacząć</div>

            <div className="inline-grid grid-cols-1 2md:text-left text-center">
                <div className="max-w-[600px] flex  flex-col justify-center gap-4 flex-1 items-center text-center">
                    <div>
                        <Image width={60} height={60} src="/images/image 359.png" alt=""></Image>
                    </div>
                    <div className={`${eUkraine.className}`}>Oddajesz i dostajesz</div>
                    <div className="font-light text-[15px]">
                        Kiedy twoja książka znajdzie nowego właścicela dostajesz 1 point.
                        <br />
                        <br />
                        Jeden point wymienisz na jedną książkę.
                    </div>
                </div>
            </div>
            <GetStartedBtn></GetStartedBtn>
        </div>
    );
}

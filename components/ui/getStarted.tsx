import Image from "next/image";
import { eUkraine} from "./fonts";

export default function GetStarted() {
    return (
            <div className="flex flex-col items-center gap-[110px] px-[70px] 2md:px-[230px] py-[75px] font-medium text-2xl">
                <div className="text-center">Zobacz jak zacząć</div>
                <div className="inline-grid grid-cols-1 mt-[110px] 2md:text-left text-center">
                    
                    <div className="max-w-[600px] flex  flex-col justify-center gap-4 flex-1 items-center text-center">
                        <div>
                            <Image width={90} height={90} src="/images/image 359.png" alt=""></Image>
                        </div>
                        <div className={`font-semibold ${eUkraine.className}`}>Oddajesz i dostajesz</div>
                        <div className="text-base">
                            Kiedy twoja książka znajdzie nowego właścicela dostajesz 1 point.
                            <br />
                            <br />
                            Jeden point wymienisz na jedną książkę.
                        </div>
                    </div>
                    
                </div>
                <div className="group">
                    <div className="bg-[#00FF0A] w-fit rounded-2xl px-7 py-2.5 font-semibold transition duration-200 group-hover:translate-y-[-3px] cursor-pointer">
                        Get Started
                    </div>
                </div>
            </div>
    );
}

import Image from "next/image";
import { helveticaNeueCyr } from "./fonts";

export default function GetStarted() {
    return (
        <div className="px-[70px] 2md:px-[150px] py-[75px] font-medium text-xl">
            <div className="text-center">Zobacz jak zacząć</div>
            <div className="grid grid-cols-1 gap-36 gap-y-20 mt-[110px] 2md:grid-cols-2 2md:text-left text-center">
                <div className="flex flex-col gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={90}
                            height={90}
                            src="/images/phone.png"
                            alt=""
                        ></Image>
                    </div>
                    <div
                        className={`font-semibold ${helveticaNeueCyr.className}`}
                    >
                        Wejdź do systemu
                    </div>
                    <div className="text-sm">Ciśnij ‘Get Started’.</div>
                </div>
                <div className="flex flex-col gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={90}
                            height={90}
                            src="/images/image 359.png"
                            alt=""
                        ></Image>
                    </div>
                    <div
                        className={`font-semibold ${helveticaNeueCyr.className}`}
                    >
                        Oddajesz i dostajesz
                    </div>
                    <div className="text-sm">
                        Kiedy twoja książka znajdzie nowego właścicela dostajesz
                        1 point.
                        <br />
                        <br />
                        Jeden point wymienisz na jedną książkę.
                    </div>
                </div>
            </div>
        </div>
    );
}

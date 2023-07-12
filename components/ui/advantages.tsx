import Image from "next/image";
import { helveticaNeueCyr } from "./fonts";


export default function Advantages() {
    return (
        <div className="px-[70px] 2md:px-[150px] py-[75px] font-medium text-xl">
            <div className="text-center">
                Wierzymy, że korzystanie z serwisu może dostarczyć <br /> wiele
                radości i wzbogacić Twoje doświadczenie czytelnicze.
            </div>
            <div className="grid grid-cols-1 gap-36 gap-y-20 mt-[110px] 2md:grid-cols-2 2md:text-left text-center">
                <div className="flex flex-col gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={90}
                            height={90}
                            src="/images/image 1553.png"
                            alt=""
                        ></Image>
                    </div>
                    <div
                        className={`font-semibold ${helveticaNeueCyr.className}`}
                    >
                        Zrównoważony styl życia
                    </div>
                    <div className="text-sm">
                        Tutaj skorzystając z już istniejących książek i dzieląc
                        się nimi z innymi, przyczyniasz się do redukcji
                        marnotractwa i zrównoważonego stylu życia.
                    </div>
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
                        Wymiana
                    </div>
                    <div className="text-sm">
                        To doskonały sposób na pozbycie się niechcianych książek
                        i zdobycie nowych, bez konieczności kupowania.
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={90}
                            height={90}
                            src="/images/image 294.png"
                            alt=""
                        ></Image>
                    </div>
                    <div
                        className={`font-semibold ${helveticaNeueCyr.className}`}
                    >
                        Odkrywanie nowych książek
                    </div>
                    <div className="text-sm">
                        Umożliwiamy odkrywanie nowych tytułów i autorów, których
                        wcześniej nie znałeś.
                    </div>
                </div>
                <div className="flex flex-col gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={90}
                            height={90}
                            src="/images/image 1016.png"
                            alt=""
                        ></Image>
                    </div>
                    <div
                        className={`font-semibold ${helveticaNeueCyr.className}`}
                    >
                        Za darmo
                    </div>
                    <div className="text-sm">
                        BookCrossing oferuje możliwość czytania i odkrywania
                        nowych książek bez żadnych kosztów.
                    </div>
                </div>
            </div>
        </div>
    );
}

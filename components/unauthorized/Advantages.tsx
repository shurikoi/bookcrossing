import Image from "next/image"
import { eUkraine } from "../fonts"

export default function Advantages() {
    return (
        <div className="flex flex-col items-center px-[40px] 2md:px-[230px] py-[75px] font-normal text-[20px]">
            <div className="text-center text-[20px] 2md:text-[24px] font-normal">
                Wierzymy, że korzystanie z&nbsp;serwisu może dostarczyć wiele radości
                i wzbogacić Twoje doświadczenie czytelnicze.
            </div>
            <div className="inline-grid grid-cols-1 gap-12 mt-[110px] 2md:grid-cols-[auto_auto] 2md:text-left text-center">
                <div className="max-w-[600px] flex flex-col justify-center gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={60}
                            height={60}
                            src="/images/image 1553.png"
                            alt=""
                        ></Image>
                    </div>
                    <div className={`${eUkraine.className}`}>Zrównoważony styl życia</div>
                    <div className="font-light text-[15px]">
                        Tutaj skorzystając z już istniejących książek i dzieląc się nimi z
                        innymi, przyczyniasz się do redukcji marnotractwa i zrównoważonego
                        stylu życia.
                    </div>
                </div>

                <div className="max-w-[600px] flex flex-col gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={60}
                            height={60}
                            src="/images/image 359.png"
                            alt=""
                        ></Image>
                    </div>
                    <div className={`${eUkraine.className}`}>Wymiana</div>
                    <div className="font-light text-[15px]">
                        To doskonały sposób na pozbycie się niechcianych książek i zdobycie
                        nowych, bez konieczności kupowania.
                    </div>
                </div>

                <div className="max-w-[600px] flex flex-col gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={60}
                            height={60}
                            src="/images/image 294.png"
                            alt=""
                        ></Image>
                    </div>
                    <div className={`font-normal ${eUkraine.className}`}>
                        Odkrywanie nowych książek
                    </div>
                    <div className="font-light text-[15px]">
                        Umożliwiamy odkrywanie nowych tytułów i autorów, których wcześniej
                        nie znałeś.
                    </div>
                </div>

                <div className="max-w-[600px] flex flex-col gap-4 flex-1 items-center 2md:items-start">
                    <div>
                        <Image
                            width={60}
                            height={60}
                            src="/images/image 1016.png"
                            alt=""
                        ></Image>
                    </div>
                    <div className={`font-normal ${eUkraine.className}`}>Za darmo</div>
                    <div className="font-light text-[15px]">
                        BookCrossing oferuje możliwość czytania i odkrywania nowych książek
                        bez żadnych kosztów.
                    </div>
                </div>
            </div>
        </div>
    )
}

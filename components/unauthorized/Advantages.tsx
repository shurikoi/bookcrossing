import Image from "next/image"
import { eUkraine } from "../fonts"

export default function Advantages() {
    return (
        <div className="flex flex-col items-center px-[40px] lg:px-[230px] py-[75px] font-normal text-[20px]">
            <div className="text-center text-[20px] lg:text-[24px] font-extralight">
                BookCrossing — to społeczność, gdzie wymieniają się
                książkami nawzajem.
            </div>
            <div className="inline-grid grid-cols-1 gap-12 mt-[110px] lg:grid-cols-[auto_auto] lg:text-left text-center">
                <div className="max-w-[600px] flex flex-col justify-center gap-4 flex-1 items-center lg:items-start">
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
                        Tutaj skorzystając z&nbsp;już istniejących książek i&nbsp;dzieląc się nimi z&nbsp;
                        innymi, przyczyniasz się do redukcji marnotractwa i&nbsp;zrównoważonego
                        stylu życia.
                    </div>
                </div>

                <div className="max-w-[600px] flex flex-col gap-4 flex-1 items-center lg:items-start">
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
                        To doskonały sposób na pozbycie się niechcianych książek i&nbsp;zdobycie
                        nowych, bez konieczności kupowania.
                    </div>
                </div>

                <div className="max-w-[600px] flex flex-col gap-4 flex-1 items-center lg:items-start">
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
                        Umożliwiamy odkrywanie nowych tytułów i&nbsp;autorów, których wcześniej
                        nie znałeś.
                    </div>
                </div>

                <div className="max-w-[600px] flex flex-col gap-4 flex-1 items-center lg:items-start">
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
                        BookCrossing oferuje możliwość czytania i&nbsp;odkrywania nowych książek
                        bez żadnych kosztów.
                    </div>
                </div>
            </div>
        </div>
    )
}

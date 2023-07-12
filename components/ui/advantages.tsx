import Image from "next/image";
import localFont from "next/font/local";

const helveticaNeueCyr = localFont({
    src: [
        {
            path: "../../public/fonts/helveticaneuecyr_black.otf",
            weight: "900",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_medium.ttf",
            weight: "500",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_roman.otf",
            weight: "400",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_ultralightitalic.otf",
            weight: "200",
            style: "italic",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_ultralight.otf",
            weight: "200",
        },
        {
            path: "../../public/fonts/helveticaneuecyr_thin.otf",
            weight: "100",
        },
    ],
});

export default function Advantages(){
    return (
        <div className="px-[150px] py-[75px] font-medium text-xl">
                <div className="text-center">
                    Wierzymy, że korzystanie z serwisu może dostarczyć <br /> wiele
                    radości i wzbogacić Twoje doświadczenie czytelnicze.
                </div>
                <div className="grid grid-cols-2  gap-36 gap-y-20 mt-[110px]">
                    <div className="flex flex-col gap-4 flex-1">
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
                        <div>
                            Tutaj skorzystając z już istniejących książek i
                            dzieląc się nimi z innymi, przyczyniasz się do
                            redukcji marnotractwa i zrównoważonego stylu życia.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
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
                        <div>
                            To doskonały sposób na pozbycie się niechcianych
                            książek i zdobycie nowych, bez konieczności
                            kupowania.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
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
                        <div>
                            Umożliwiamy odkrywanie nowych tytułów i autorów,
                            których wcześniej nie znałeś.
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
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
                        <div>
                            BookCrossing oferuje możliwość czytania i odkrywania
                            nowych książek bez żadnych kosztów.
                        </div>
                    </div>
                </div>
            </div>
    )
}
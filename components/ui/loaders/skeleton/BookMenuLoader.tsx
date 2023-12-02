import { useScreen } from "@/components/contexts/ScreenProvider";
import LanguageIcon from "../../icons/LanguageIcon";
import LeafIcon from "../../icons/LeafIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import TagIcon from "../../icons/TagIcon";

export default function BookMenuLoader() {
    const { isSmallScreen } = useScreen();

    return (
        <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-10 shrink-0 md:w-[220px]">
                <div className="relative shrink-0">
                    <div className="relative w-full aspect-[3/4]">
                        <div className="w-full h-full skeleton"></div>
                    </div>
                    <div className="skeleton absolute bottom-0 w-16 h-16 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-full bg-gray-500 cursor-pointer shadow-[0px_0px_15px_1px_rgba(0,0,0,.2)]"></div>
                </div>
                {!isSmallScreen && (
                    <div className="flex flex-col gap-2.5 w-full">
                        <div className="py-2 skeleton rounded-lg cursor-pointer h-[2.75rem]"></div>
                        <div className="py-2 skeleton rounded-lg cursor-pointer h-[2.75rem]"></div>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-8 items-center text-center md:items-start md:text-left px-6 md:p-0">
                <div className="font-head font-normal text-[20px] skeleton h-[2rem] w-full rounded-md"></div>
                <div className="w-full grid grid-cols-[repeat(2,1fr)] grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 md:pr-10">
                    <div className="flex flex-col gap-3 whitespace-nowrap items-center md:items-start">
                        <div className="flex gap-3 items-center">
                            <ProfileIcon />
                            <div className="text-[#4E4E4E]">Autor</div>
                        </div>
                        <div className={`py-2 px-3 rounded-sm w-full skeleton h-[2rem]`}></div>
                    </div>
                    <div className="flex flex-col gap-3 whitespace-nowrap items-center md:items-start">
                        <div className="flex gap-3 items-center">
                            <LeafIcon />
                            <div className="text-[#4E4E4E]">Stan</div>
                        </div>
                        <div className={`py-2 px-3 rounded-sm w-full skeleton h-[2rem]`}></div>
                    </div>
                    <div className="flex flex-col gap-3 whitespace-nowrap items-center md:items-start">
                        <div className="flex gap-3 items-center">
                            <TagIcon />
                            <div className="text-[#4E4E4E]">Kategoria</div>
                        </div>
                        <div className={`py-2 px-3 rounded-sm w-full skeleton h-[2rem]`}></div>
                    </div>
                    <div className="flex flex-col gap-3 whitespace-nowrap items-center md:items-start">
                        <div className="flex gap-3 items-center">
                            <LanguageIcon />
                            <div className="text-[#4E4E4E]">Język</div>
                        </div>
                        <div className={`py-2 px-3 rounded-sm w-full skeleton h-[2rem]`}></div>
                    </div>
                </div>
                <div className="text-[#474747] font-light font-inter mt-auto text-[15px] w-full md:w-[500px] h-[180px] skeleton"></div>
                {isSmallScreen && (
                    <div className="flex flex-col gap-2.5 w-full">
                        <div className="py-2 skeleton rounded-lg cursor-pointer h-[2.75rem]"></div>
                        <div className="py-2 skeleton rounded-lg cursor-pointer h-[2.75rem]"></div>
                    </div>
                )}
            </div>
        </div>
    );
}

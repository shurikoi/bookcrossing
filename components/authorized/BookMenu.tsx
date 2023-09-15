import { messengers } from "./Contact";
import { bookData } from "./Publications";
import Book from "../ui/Book";
import ProfileIcon from "../ui/icons/ProfileIcon";
import TagIcon from "../ui/icons/TagIcon";

export default function BookMenu({ data }: { data: bookData }) {
    const { title, author, category, description, messengerDescription, messenger } = data;

    return (
        <div className="flex flex-col text-left mt-16 sm:mt-0 gap-5 sm:p-6">
            <div className="flex gap-16">
                <div className="flex flex-col gap-10 w-full">
                    <div className="flex flex-col gap-5">
                        <div className="w-full font-head font-normal text-xl">{title}</div>
                        <div className="flex gap-12 font-extralight text-[14px]">
                            <div className="text-left flex flex-col gap-5">
                                <div className="flex gap-3 items-center">
                                    <TagIcon></TagIcon>
                                    <div>Kategoria</div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <ProfileIcon></ProfileIcon>
                                    <div>Autor</div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    {messengers[messenger]?.icon}
                                    <div>{messengers[messenger]?.name}</div>
                                </div>
                            </div>
                            <div className="text-left flex flex-col gap-5">
                                <div className="flex gap-3 items-center">
                                    <div>{category}</div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div>{author}</div>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <div>{messengerDescription}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="font-inter text-sm resize-none w-full max-w-[500px] h-36 cursor-auto whitespace-pre-wrap break-words overflow-y-auto ">
                        {description}
                    </div>
                </div>
                <div className="hidden 2sm:block">
                    <Book data={data} />
                </div>
            </div>

            {/* <div className="flex gap-2">
                <div className="shadow-md px-4 py-2 flex items-center bg-red-400 gap-3 rounded-lg duration-200 hover:-translate-y-0.5 cursor-pointer will-change-transform select-none">
                    <TrashCanIcon />
                    <div>Usuń</div>
                </div>
                <div className="shadow-md px-4 py-2 flex items-center bg-[#F2F9F0] gap-3 rounded-lg duration-200 hover:-translate-y-0.5 cursor-pointer will-change-transform select-none">
                    <PencilIcon />
                    <div>Edytuj</div>
                </div>
            </div> */}
        </div>
    );
}

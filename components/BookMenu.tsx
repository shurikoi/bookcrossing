import { messengers } from "./Contact";
import { data } from "./Publications";
import Book from "./ui/Book";
import ProfileIcon from "./ui/ProfileIcon";
import TagIcon from "./ui/TagIcon";

export default function BookMenu({ data }: { data: data }) {
    const { title, author, category, description, messengerDescription, messenger } = data;
    return (
        <div className="flex flex-col gap-5 w-[700px]">
            <div className="flex gap-16">
                <div className="flex flex-col gap-5 w-full">
                    <div className="w-full font-head font-normal text-lg">{title}</div>
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
                <Book data={data} />
            </div>
            <div className="font-inter text-sm resize-none w-full h-36 cursor-auto whitespace-pre-wrap break-words overflow-y-auto">
                {description}
            </div>
        </div>
    );
}

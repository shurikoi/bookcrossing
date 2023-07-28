import { data } from "./Publications";
import Book from "./ui/Book";
import LinkIcon from "./ui/LinkIcon";
import ProfileIcon from "./ui/ProfileIcon";
import TagIcon from "./ui/TagIcon";

export default function ModalBookMenu({ data }: { data: data }) {
    const { title, author, category, date, description, image, owner } = data;
    console.log(data);
    return (
        <div className="flex flex-col gap-5 max-w-[652px]">
            <div className="flex gap-16">
                <div className="flex flex-col gap-5 w-full">
                    <div className="w-full font-head font-normal placeholder:text-[#9A9A9A] text-lg border-b border-b-black/40">
                        {title}
                    </div>
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
                        </div>
                        <div className="text-left flex flex-col gap-5">
                            <div className="flex gap-3 items-center">
                                <div>{category}</div>
                            </div>
                            <div className="flex gap-3 items-center">
                                <div>{author}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Book author={author} title={title} date="Dzisiaj" image={image} />
            </div>
            <div className="font-inter text-sm resize-none w-full h-36 cursor-auto">{description}</div>
        </div>
    );
}

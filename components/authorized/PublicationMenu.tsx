import Contact, { messenger, messengers } from "./Contact";
import ProfileIcon from "../ui/icons/ProfileIcon";
import TagIcon from "../ui/icons/TagIcon";
import ModalMenu from "../ui/ModalMenu";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { bookData } from "./Main";
import LanguageIcon from "../ui/icons/LanguageIcon";
import LeafIcon from "../ui/icons/LeafIcon";
import { useUserData } from "../contexts/UserProviders";
import Book from "../ui/Book";
import CategoriesMenu from "./CategoriesMenu";
import DropDownMenuWithSearch from "../ui/DropDownMenuWithSearch";
import Categories from "./Categories";
import { useScreen } from "../contexts/ScreenProvider";
import isPublicationDataValid from "@/lib/isPublicationDataValid";

const languages = ["angielski", "polski", "ukraiński"];
const bookStates = ["Nowa", "Jak nowa", "Bardzo dobry", "Dobry", "Przeciętny", "Zły"];
const categories = [
    "Powieść historyczna",
    "Kryminał",
    "Fantastyka",
    "Romans",
    "Science Fiction",
    "Horror",
    "Literatura podróżnicza",
    "Dramat",
    "Poezja",
    "Biografia",
];

export type publicationData = {
    title: string;
    author: string;
    category: string;
    description: string;
    owner: string;
    imageName: string;
    image: File;
    messenger: messenger;
    messengerDescription: string;
};

interface image {
    url: string;
    file: File | undefined;
}

type errors = {
    title: boolean;
    author: boolean;
    category: boolean;
    image: boolean;
    messengerDescription: boolean;
    hasErrors: boolean;
};

interface publicationMenuProps {
    setBooks: Dispatch<SetStateAction<bookData[]>>;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function BookMenu({ setBooks, isModalActive, setIsModalActive }: publicationMenuProps) {
    const { user } = useUserData();
    const { isSmallScreen } = useScreen();

    const [isContactVisible, setIsContactVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPreviewMenuActive, setIsPreviewMenuActive] = useState(false);

    const imageRef = useRef<HTMLInputElement>(null);

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [language, setLanguage] = useState("");
    const [state, setState] = useState("");
    const [messenger, setMessenger] = useState<messenger>("Telegram");
    const [messengerDescription, setMessengerDescription] = useState("");

    const [image, setImage] = useState<image>({
        url: "",
        file: undefined,
    });

    const bookData: bookData = {
        author,
        title,
        description,
        category,
        image: image.url,
        owner: user!.id,
        messenger,
        messengerDescription,
        date: "Dzisiaj",
    };

    const [errors, setErrors] = useState<errors>({
        title: false,
        author: false,
        category: false,
        image: false,
        messengerDescription: false,
        hasErrors: false,
    });

    function handleContactClick() {
        if (!isContactVisible) setIsContactVisible(true);
    }

    return (
        <ModalMenu fullMode isModalActive={isModalActive} setIsModalActive={setIsModalActive}>
            <div className="flex md:w-[640px] lg:w-[800px] gap-10 md:p-6">
                <div className="flex flex-col justify-between gap-2.5 shrink-0 w-[200px]">
                    <Book data={bookData}></Book>
                    <div
                        className="font-inter font-medium py-2.5 px-2 active:scale-[0.99] will-change-transform text-center bg-[#52CD4F] text-white rounded-lg cursor-pointer duration-300"
                        onClick={handleContactClick}
                    >
                        {isContactVisible ? (
                            <div className="flex gap-2 items-center justify-center">
                                <div>Publikuj</div>
                                <div className="text-ellipsis overflow-hidden ">{messengerDescription}</div>
                            </div>
                        ) : (
                            "Pokaż kontakt"
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <input
                        className="text-[#474747] font-head font-normal text-[20px] border-b border-b-black/25"
                        placeholder="Bez tytułu"
                        value={title}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                    <div className="grid grid-cols-3 grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 w-fit grid-cols">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <ProfileIcon></ProfileIcon>
                                <div className="text-[#4E4E4E]">Autor</div>
                            </div>
                            <input
                                className="py-2 px-3 bg-[#a4e94d7a] rounded-sm"
                                value={author}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <LeafIcon></LeafIcon>
                                <div className="text-[#4E4E4E]">Stan</div>
                            </div>
                            {/* <input className="py-2 px-3 bg-[#4d66e97a] rounded-sm" /> */}
                            <DropDownMenuWithSearch
                                items={bookStates}
                                setItem={setState}
                                inputClassName="py-2 px-3 bg-[#e9d04d7a] rounded-sm border-b w-full"
                            ></DropDownMenuWithSearch>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                {/* <DropDownMenuWithSearch
                                    items={categories}
                                    setItem={setCategory}
                                    inputClassName="py-2 px-3 bg-[#e9d04d7a] rounded-sm border-b w-full"
                                ></DropDownMenuWithSearch> */}
                                <Contact messenger={messenger} setMessenger={setMessenger}></Contact>
                            </div>
                            <input className="py-2 px-3 bg-[#4d9ee97a] rounded-sm border-b" />
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <TagIcon></TagIcon>
                                <div className="text-[#4E4E4E]">Kategoria</div>
                            </div>
                            <DropDownMenuWithSearch
                                items={categories}
                                setItem={setCategory}
                                inputClassName="py-2 px-3 bg-[#e9d04d7a] rounded-sm border-b w-full"
                            ></DropDownMenuWithSearch>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <LanguageIcon></LanguageIcon>
                                <div className="text-[#4E4E4E]">Język</div>
                            </div>
                            {/* <input className="py-2 px-3 bg-[#e97c4d7a] rounded-sm border-b" /> */}
                            <DropDownMenuWithSearch
                                items={languages}
                                setItem={setLanguage}
                                inputClassName="py-2 px-3 bg-[#e97c4d7a] rounded-sm border-b w-full"
                            ></DropDownMenuWithSearch>
                        </div>
                    </div>
                    <textarea
                        className="resize-none border border-black/25 p-2 text-[#4E4E4E] text-[15px] font-inter font-light"
                        value={description}
                        onChange={(e: ChangeEvent<HTMLTextAreaElement >) => setDescription(e.target.value)}
                    >
                        
                    </textarea>
                </div>
            </div>
        </ModalMenu>
    );
}

// import { Dispatch, FormEvent, SetStateAction, memo, useRef, useState } from "react";
// import Book from "../ui/Book";
// import TagIcon from "../ui/icons/TagIcon";
// import LinkIcon from "../ui/icons/LinkIcon";
// import Categories from "./Categories";
// import ProfileIcon from "../ui/icons/ProfileIcon";
// import ContentLoader from "../ui/ContentLoader";
// import WarningIcon from "../ui/icons/WarningIcon";
// import Contact, { messenger } from "./Contact";
// import isPublicationDataValid from "@/lib/isPublicationDataValid";
// import { useUserData } from "../contexts/UserProviders";
// import SubmitIcon from "../ui/icons/SubmitIcon";
// import { useScreen } from "../contexts/ScreenProvider";
// import PreviewMenu from "./PreviewMenu";
// import ModalMenu from "../ui/ModalMenu";
// import { bookData } from "./Main";

// const categories = [
//     "Powieść historyczna",
//     "Kryminał",
//     "Fantastyka",
//     "Romans",
//     "Science Fiction",
//     "Horror",
//     "Literatura podróżnicza",
//     "Dramat",
//     "Poezja",
//     "Biografia",
// ];

// export type publicationData = {
//     title: string;
//     author: string;
//     category: string;
//     description: string;
//     owner: string;
//     imageName: string;
//     image: File;
//     messenger: messenger;
//     messengerDescription: string;
// };

// interface image {
//     url: string;
//     file: File | undefined;
// }

// type errors = {
//     title: boolean;
//     author: boolean;
//     category: boolean;
//     image: boolean;
//     messengerDescription: boolean;
//     hasErrors: boolean;
// };

// interface publicationMenuProps {
//     setBooks: Dispatch<SetStateAction<bookData[]>>;
//     isModalActive: boolean;
//     setIsModalActive: Dispatch<SetStateAction<boolean>>;
// }

// export default memo(function PublicationMenu({ setBooks, isModalActive, setIsModalActive }: publicationMenuProps) {
//     const { user } = useUserData();

//     const [author, setAuthor] = useState("");
//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [category, setCategory] = useState("");
//     const [image, setImage] = useState<image>({
//         url: "",
//         file: undefined,
//     });

//     const [messenger, setMessenger] = useState<messenger>("Telegram");
//     const [messengerDescription, setMessengerDescription] = useState("");

//     const bookData: bookData = {
//         author,
//         title,
//         description,
//         category,
//         image: image.url,
//         owner: user!.id,
//         messenger,
//         messengerDescription,
//         date: "Dzisiaj",
//     };

//     const [isLoading, setIsLoading] = useState(false);
//     const [isPreviewMenuActive, setIsPreviewMenuActive] = useState(false);

//     const { isSmallScreen } = useScreen();

//     const imageRef = useRef<HTMLInputElement>(null);

//     const [errors, setErrors] = useState<errors>({
//         title: false,
//         author: false,
//         category: false,
//         image: false,
//         messengerDescription: false,
//         hasErrors: false,
//     });

//     function handleInputFile(e: FormEvent<HTMLInputElement>) {
//         const files = (e.target as HTMLInputElement).files;

//         if (files && files[0]) {
//             setImage({
//                 url: URL.createObjectURL(files[0]),
//                 file: files[0],
//             });
//         }
//     }

//     function handleSubmit() {
//         if (isLoading) return;

//         if (!isPreviewMenuActive && isSmallScreen) {
//             setIsPreviewMenuActive(true);
//             return;
//         }

//         setIsLoading(true);

//         setErrors({
//             title: false,
//             author: false,
//             category: false,
//             image: false,
//             messengerDescription: false,
//             hasErrors: false,
//         });

//         const errors = isPublicationDataValid({
//             ...bookData,
//             image: image.file!,
//             imageName: image.file?.name!,
//         });

//         if (errors.hasErrors) {
//             setTimeout(() => {
//                 setIsLoading(false);
//                 setErrors(errors);
//             }, 250);

//             return;
//         }

//         const form = new FormData();

//         form.append("image", image.file!);
//         form.append("imageName", image.file?.name!);
//         form.append("author", author);
//         form.append("owner", user!.id);
//         form.append("title", title);
//         form.append("description", description);
//         form.append("category", category);
//         form.append("messenger", messenger);
//         form.append("messengerDescription", messengerDescription);

//         fetch("/api/create-publication", {
//             method: "POST",
//             body: form,
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 setBooks((prev) => [bookData, ...prev]);
//                 setIsLoading(false);
//                 setIsModalActive(false);

//                 setAuthor("");
//                 setTitle("");
//                 setDescription("");
//                 setCategory("");
//                 setMessengerDescription("");
//                 setImage({
//                     url: "",
//                     file: undefined,
//                 });
//                 setMessenger("Telegram");
//             });
//     }

//     return (
//         <ModalMenu fullMode isModalActive={isModalActive} setIsModalActive={setIsModalActive}>
//             <div className="flex flex-col md:gap-5 h-full  justify-between md:min-h-[500px] md:min-w-[640px] lg:min-w-[820px] md:p-6">
//                 <div className="flex justify-between md:gap-4">
//                     <div className="flex flex-col gap-5 w-full">
//                         <div className="relative flex flex-col">
//                             <input
//                                 className={`w-full font-head font-normal placeholder:text-[#9A9A9A] duration-200 text-lg`}
//                                 type="text"
//                                 value={title}
//                                 onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
//                                 placeholder="Bez tytułu"
//                             />
//                             {errors.title && (
//                                 <div className="absolute flex items-center gap-1 -bottom-3">
//                                     <>
//                                         <WarningIcon />
//                                         <div className=" text-[#DD0000] font-inter font-normal text-[13px] leading-none">
//                                             Niestety, pole musi się składać z 2-55 znaków
//                                         </div>
//                                     </>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="flex gap-12 font-extralight text-[14px] justify-start">
//                             <div className="text-left flex flex-col gap-5">
//                                 <div className="flex gap-3 items-center">
//                                     <TagIcon />
//                                     <div>Kategoria</div>
//                                 </div>
//                                 <div className="flex flex-col gap-1">
//                                     <div className="relative flex gap-3 items-center">
//                                         <ProfileIcon />
//                                         <div>Autor</div>
//                                         {errors.author && (
//                                             <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-4">
//                                                 <>
//                                                     <WarningIcon />
//                                                     <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
//                                                         Niestety, pole musi się składać z 2-55 znaków
//                                                     </div>
//                                                 </>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                                 <div className="flex gap-3 items-center">
//                                     <LinkIcon />
//                                     <div>Zdjęcie</div>
//                                 </div>
//                                 <Contact messenger={messenger} setMessenger={setMessenger} />
//                             </div>
//                             <div className="flex flex-col gap-5">
//                                 <Categories
//                                     categories={categories}
//                                     category={category}
//                                     setCategory={setCategory}
//                                     error={errors.category}
//                                 />
//                                 <input
//                                     className={`placeholder:text-[#9A9A9A]`}
//                                     type="text"
//                                     value={author}
//                                     onInput={(e) => setAuthor((e.target as HTMLInputElement).value)}
//                                     placeholder="wprowadź tutaj..."
//                                 />
//                                 <div
//                                     className={`${
//                                         errors.image ? "text-[#DD0000]" : "text-inherit"
//                                     } cursor-pointer overflow-ellipsis overflow-hidden whitespace-nowrap`}
//                                     onClick={() => imageRef.current?.click()}
//                                 >
//                                     {image.file ? "Załączono" : "wybierz plik do 10 MB"}
//                                 </div>
//                                 <input
//                                     ref={imageRef}
//                                     type="file"
//                                     onInput={handleInputFile}
//                                     placeholder="wybierz..."
//                                     accept="image/png, image/jpeg"
//                                     hidden
//                                 />
//                                 <input
//                                     className={`${
//                                         errors.messengerDescription
//                                             ? "placeholder:text-[#DD0000]"
//                                             : "placeholder:text-[#9A9A9A]"
//                                     }`}
//                                     type="text"
//                                     placeholder="wprowadź tutaj..."
//                                     onInput={(e) => setMessengerDescription((e.target as HTMLInputElement).value)}
//                                 />
//                             </div>
//                         </div>
//                         <hr className="border-black/40" />
//                         <div className="font-inter text-xs font-light">Tutaj napiszesz dodatkowe informacje</div>
//                         <textarea
//                             value={description}
//                             onInput={(e) => setDescription((e.target as HTMLTextAreaElement).value)}
//                             className="font-inter text-sm resize-none w-full h-36 cursor-auto"
//                             placeholder="Zacznij pisać"
//                         ></textarea>
//                     </div>
//                     <div className="hidden md:block">
//                         <Book
//                             data={bookData}
//                             handleClick={() => {
//                                 imageRef.current?.click();
//                             }}
//                         />
//                     </div>
//                 </div>

//                 <div className="flex justify-center md:justify-start">
//                     {isLoading ? (
//                         <div className="relative w-[33px] h-[33px]">
//                             <ContentLoader />
//                         </div>
//                     ) : (
//                         <div
//                             className={`${
//                                 isLoading ? "text-gray-400" : "text-black"
//                             } duration-200 cursor-pointer w-fit`}
//                             onClick={handleSubmit}
//                         >
//                             <SubmitIcon></SubmitIcon>
//                         </div>
//                     )}
//                 </div>
//                 {isSmallScreen && (
//                     <PreviewMenu
//                         previewData={bookData}
//                         handleSubmit={handleSubmit}
//                         isLoading={isLoading}
//                         isMenuActive={isPreviewMenuActive}
//                         setIsMenuActive={setIsPreviewMenuActive}
//                     ></PreviewMenu>
//                 )}
//             </div>
//         </ModalMenu>
//     );
// });

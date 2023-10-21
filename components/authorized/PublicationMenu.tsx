import ProfileIcon from "../ui/icons/ProfileIcon";
import TagIcon from "../ui/icons/TagIcon";
import ModalMenu from "../ui/ModalMenu";
import { ChangeEvent, Dispatch, DragEvent, SetStateAction, useEffect, useRef, useState } from "react";
import { bookData, publication } from "./Main";
import LanguageIcon from "../ui/icons/LanguageIcon";
import LeafIcon from "../ui/icons/LeafIcon";
import { useUserData } from "../contexts/UserProvider";
import DropDownMenuWithSearch from "../ui/DropDownMenuWithSearch";
import PhotosIcon from "../ui/icons/PhotosIcon";
import Button from "../ui/buttons/Button";
import ArrowLeftIcon from "../ui/icons/ArrowLeftIcon";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import SmallPhotosIcon from "../ui/icons/SmallPhotosIcon";
import books from "@/model/book";

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

const languages = ["Angielski", "Polski", "Ukraiński"];

const bookStates = ["Bardzo dobry", "Dobry", "Akceptowany", "Zły"];

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

interface StepOneProps {
    setFile: Dispatch<SetStateAction<File | undefined>>;
    setCurrentStep: Dispatch<SetStateAction<number>>;
}

interface StepTwoProps {
    file: File | undefined;
    publicationData: bookData | undefined;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    setPublicationData: Dispatch<SetStateAction<bookData | undefined>>;
}

interface StepThreeProps {
    file: File | undefined;
    publicationData: bookData | undefined;
    setCurrentStep: Dispatch<SetStateAction<number>>;
}

interface PublicationMenuProps {
    setBooks: Dispatch<SetStateAction<publication[]>>;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function PublicationMenu({ setBooks, isModalActive, setIsModalActive }: PublicationMenuProps) {
    const [currentStep, setCurrentStep] = useState(0);

    const [publicationData, setPublicationData] = useState<bookData>();

    const [file, setFile] = useState<File>();

    const [isBackgroundClickPrevented, setIsBackgroundClickPrevented] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsBackgroundClickPrevented(true);

        setTimeout(() => {
            setIsBackgroundClickPrevented(false);
        }, 400);
    }, [file]);

    useEffect(() => {
        setTimeout(() => setIsBackgroundClickPrevented(false), 10000);
    }, [isBackgroundClickPrevented]);

    const steps = [
        <StepOne setFile={setFile} setCurrentStep={setCurrentStep}></StepOne>,
        <StepTwo
            file={file}
            publicationData={publicationData}
            setPublicationData={setPublicationData}
            setCurrentStep={setCurrentStep}
        ></StepTwo>,
        <StepThree file={file} publicationData={publicationData} setCurrentStep={setCurrentStep}></StepThree>,
    ];
    const nodeRef = useRef<any>(null);
    return (
        <>
            {isBackgroundClickPrevented && (
                <div
                    ref={overlayRef}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                    className="z-50 w-screen h-screen fixed top-0 left-0 preventedClick"
                ></div>
            )}
            <ModalMenu fullMode isModalActive={isModalActive} setIsModalActive={setIsModalActive}>
                <SwitchTransition mode="out-in">
                    <CSSTransition
                        key={currentStep}
                        classNames="fade"
                        nodeRef={nodeRef}
                        addEndListener={(done: any) => {
                            if (nodeRef.current) {
                                nodeRef.current.addEventListener("transitionend", done, false);
                            }
                        }}
                    >
                        <div ref={nodeRef}>{steps[currentStep]}</div>
                    </CSSTransition>
                </SwitchTransition>
            </ModalMenu>
        </>
    );
}

function StepOne({ setFile, setCurrentStep }: StepOneProps) {
    const fileRef = useRef<HTMLInputElement>(null);

    const [isWindowHovered, setIsWindowHovered] = useState(false);

    useEffect(() => {
        function handleDragStart() {
            setIsWindowHovered(true);
        }

        function handleDragEnd(e: any) {
            if (!e.relatedTarget) setIsWindowHovered(false);
        }

        window.addEventListener("dragenter", handleDragStart);
        window.addEventListener("dragleave", handleDragEnd);

        return () => {
            window.removeEventListener("dragenter", handleDragStart);
            window.removeEventListener("dragleave", handleDragEnd);
        };
    }, []);

    function openFileMenu() {
        if (fileRef.current) fileRef.current.click();
    }

    function handleImagePush(e: ChangeEvent<HTMLInputElement> | DragEvent) {
        e.preventDefault();

        const files = (e as DragEvent).dataTransfer?.files ?? (e as ChangeEvent<HTMLInputElement>).target?.files;

        if (files) {
            if (files[0]) {
                setFile(files[0]);
                setCurrentStep(1);
            }
        }
    }

    return (
        <>
            <div
                className={`flex flex-col rounded-lg items-center w-fit gap-16 px-[110px] py-[72px] duration-200 ${
                    isWindowHovered ? "bg-[#e4e4e4]" : "bg-white"
                }`}
                onDragOver={(e: DragEvent) => e.preventDefault()}
                onDrop={handleImagePush}
            >
                <div className="font-light text-[17px]">Opublikuj książkę</div>
                <PhotosIcon></PhotosIcon>
                <div className="flex flex-col items-center gap-6">
                    <div className="font-extralight text-[14px]">Przeciągnij zjęcie tutaj</div>
                    <Button onClick={openFileMenu}>Albo wybierz ręcznie</Button>
                    <input ref={fileRef} type="file" accept="image/png, image/jpeg" hidden onChange={handleImagePush} />
                </div>
            </div>
        </>
    );
}

function PublicationImage({ file }: { file: File | undefined }) {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        if (file) setImage(URL.createObjectURL(file));
    }, [file]);

    return <img className="w-[400px] object-cover" src={image} alt="" />;
}

function StepTwo({ file, publicationData, setPublicationData, setCurrentStep }: StepTwoProps) {
    const [title, setTitle] = useState(publicationData?.title || "");
    const [author, setAuthor] = useState(publicationData?.author || "");
    const [bookCategory, setBookCategory] = useState(publicationData?.category || "");
    const [bookLanguage, setBookLanguage] = useState(publicationData?.language || "");
    const [bookState, setBookState] = useState(publicationData?.state || "");
    const [bookDescription, setBookDescription] = useState(publicationData?.description || "");

    useEffect(() => {
        setPublicationData({
            title,
            author,
            description: bookDescription,
            category: bookCategory,
            language: bookLanguage,
            state: bookState,
            avatar: "",
            owner: "",
            messenger: "Telegram",
            messengerDescription: "",
            date: "0",
            image: file ? URL.createObjectURL(file) : "",
            ownerData: {
                avatar: "",
                name: "",
                surname: "",
            },
        });
    }, [title, author, bookCategory, bookDescription, bookLanguage, bookState]);

    const { user } = useUserData();

    return (
        <div className="flex flex-col ">
            <div className="p-3 relative text-center">
                <div className="absolute cursor-pointer w-fit" onClick={() => setCurrentStep((step) => step - 1)}>
                    <ArrowLeftIcon></ArrowLeftIcon>
                </div>
                <div>2 / 3</div>
            </div>
            <div className="inline-flex">
                <div className="flex">
                    <PublicationImage file={file}></PublicationImage>
                </div>
                <div className="grow-0 shrink-0 flex flex-col gap-6 p-4 w-[360px]">
                    <div className="flex gap-4 items-center">
                        <img className="w-10 h-10 rounded-full" src={user?.avatar} alt="" />
                        <div className="font-extralight text-base">{user?.name}</div>
                    </div>

                    <div className="flex flex-col gap-4 text-[20px] font-lato font-normal">
                        <div className="flex items-center justify-between px-1">
                            <input
                                className="placeholder:text-[#6C6C6C]"
                                placeholder="Tytuł"
                                type="text"
                                value={title}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            />
                            <SmallPhotosIcon></SmallPhotosIcon>
                        </div>
                        <div className="flex items-center justify-between px-1  text-[20px]">
                            <input
                                className="font-lato font-normal placeholder:text-[#6C6C6C]"
                                placeholder="Autor"
                                type="text"
                                value={author}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
                            />
                            <ProfileIcon height={24} width={24}></ProfileIcon>
                        </div>
                        <div className="flex items-center justify-between px-1  text-[20px]">
                            <DropDownMenuWithSearch
                                items={categories}
                                startValue={bookCategory}
                                setItem={setBookCategory}
                                placeholder="Kategoria"
                                createNewItem
                            ></DropDownMenuWithSearch>
                            <TagIcon height={24} width={24}></TagIcon>
                        </div>
                        <div className="flex items-center justify-between px-1  text-[20px]">
                            <DropDownMenuWithSearch
                                items={languages}
                                startValue={bookLanguage}
                                setItem={setBookLanguage}
                                placeholder="Język"
                                createNewItem
                            ></DropDownMenuWithSearch>
                            <LanguageIcon height={24} width={24}></LanguageIcon>
                        </div>
                        <div className="flex items-center justify-between px-1  text-[20px]">
                            <DropDownMenuWithSearch
                                items={bookStates}
                                startValue={bookState}
                                setItem={setBookState}
                                placeholder="Stan"
                            ></DropDownMenuWithSearch>
                            <LeafIcon height={24} width={24}></LeafIcon>
                        </div>
                        <div className="relative px-1">
                            <textarea
                                className="resize-none w-full max-h-[200px] placeholder:text-[#6C6C6C]"
                                value={bookDescription}
                                rows={4}
                                placeholder="Napisz komentarz"
                                maxLength={100}
                                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBookDescription(e.target.value)}
                            ></textarea>
                            <div className="absolute right-0 bottom-0 select-none text-sm text-[#767676] translate-y-1/2">
                                {bookDescription.length}/100
                            </div>
                        </div>
                    </div>
                    <div className="ml-auto p-4">
                        <Button onClick={() => setCurrentStep(2)}>Podgląd</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepThree({ file, publicationData, setCurrentStep }: StepThreeProps) {
    const { user } = useUserData();

    return (
        <div className="flex flex-col">
            <div className="p-3 relative text-center border-b">
                <div className="absolute cursor-pointer w-fit" onClick={() => setCurrentStep((step) => step - 1)}>
                    <ArrowLeftIcon></ArrowLeftIcon>
                </div>
                <div>Podgląd</div>
            </div>
            <div className="flex min-w-[700px] gap-10 md:p-6 h-fit">
                <div className="flex flex-col gap-10 shrink-0 w-[200px]">
                    <div className="relative">
                        <img src={publicationData?.image} alt="book" className="rounded-md aspect-[3/4] object-cover" />
                        <img
                            src={user?.avatar}
                            className="absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gray-500"
                        ></img>
                    </div>
                    <Button className="text-center">Publikuj</Button>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="font-head font-normal text-[20px]">{publicationData?.title}</div>
                    <div className="grid grid-cols-2 grid-rows-2 font-extralight leading-none text-[14px] gap-y-6 gap-x-10 w-fit">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <ProfileIcon></ProfileIcon>
                                <div className="text-[#4E4E4E]">Autor</div>
                            </div>
                            <div className="py-2 px-3 w-fit bg-[#a4e94d7a] rounded-sm">{publicationData?.author}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <LeafIcon></LeafIcon>
                                <div className="text-[#4E4E4E]">Stan</div>
                            </div>
                            <div className="py-2 px-3 w-fit bg-[#4d66e97a] rounded-sm">{publicationData?.state}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <TagIcon></TagIcon>
                                <div className="text-[#4E4E4E]">Kategoria</div>
                            </div>
                            <div className="py-2 px-3 w-fit bg-[#e9d04d7a] rounded-sm">{publicationData?.category}</div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3 items-center">
                                <LanguageIcon></LanguageIcon>
                                <div className="text-[#4E4E4E]">Język</div>
                            </div>
                            <div className="py-2 px-3 w-fit bg-[#e97c4d7a] rounded-sm">{publicationData?.language}</div>
                        </div>
                    </div>
                    <div className="text-[#474747] font-light font-inter text-[15px]">
                        {publicationData?.description}
                    </div>
                </div>
            </div>
        </div>
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
// import isPublicationData?Valid from "@/lib/isPublicationDataValid";
// import { useUserData } from "../contexts/UserProvider";
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

import { useUserData } from "@/components/contexts/UserProvider";
import DropDownMenuWithChoose from "@/components/ui/DropDownMenuWithChoose";
import DropDownMenuWithSearch from "@/components/ui/DropDownMenuWithSearch";
import Button from "@/components/ui/buttons/Button";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";
import LanguageIcon from "@/components/ui/icons/LanguageIcon";
import LeafIcon from "@/components/ui/icons/LeafIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import SmallPhotosIcon from "@/components/ui/icons/SmallPhotosIcon";
import TagIcon from "@/components/ui/icons/TagIcon";
import isPublicationDataValid, { errors } from "@/lib/isPublicationDataValid";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { image, messengers, publicationData } from "./PublicationMenu";

export const categories = [
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

export const languages = ["Angielski", "Polski", "Ukraiński"];

export const bookStates = ["Bardzo dobry", "Dobry", "Akceptowany", "Zły"];

const descriptionLength = 1000;

interface StepTwoProps {
  image: image;
  publicationData: publicationData | undefined;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setPublicationData: Dispatch<SetStateAction<publicationData | undefined>>;
}

export default function StepTwo({ image, publicationData, setPublicationData, setCurrentStep }: StepTwoProps) {
  const [title, setTitle] = useState(publicationData?.title || "");
  const [author, setAuthor] = useState(publicationData?.author || "");
  const [bookCategory, setBookCategory] = useState(publicationData?.category || "");
  const [bookLanguage, setBookLanguage] = useState(publicationData?.language || "");
  const [bookState, setBookState] = useState(publicationData?.state || "");
  const [bookDescription, setBookDescription] = useState(publicationData?.description || "");
  const [messenger, setMessenger] = useState(publicationData?.messenger || "Snapchat");
  const [messengerDescription, setMessengerDescription] = useState(publicationData?.messengerDescription || "");

  const [errors, setErrors] = useState<errors>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useUserData();

  useEffect(() => {
    setPublicationData({
      title,
      author,
      description: bookDescription,
      category: bookCategory,
      language: bookLanguage,
      state: bookState,
      messenger,
      messengerDescription,
      date: new Date(),
      image: image?.url || "",
    });
  }, [title, author, bookCategory, bookDescription, bookLanguage, bookState, messenger, messengerDescription]);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  return (
    <div className="flex flex-col h-full 2md:h-[610px]">
      <div className="hidden 2md:block p-3 relative text-center">
        <div className="absolute cursor-pointer w-fit" onClick={() => setCurrentStep((step) => step - 1)}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </div>
        <div>2 / 3</div>
      </div>
      <div className="flex flex-col 2md:flex-row h-full">
        <div className="flex w-full 2md:w-[400px] aspect-[3/4] relative shrink-0">
          <Image fill src={image?.url || ""} className="object-cover rounded-bl-lg" quality={100} alt="" />
          {/* <PublicationImage image={image?.data}></PublicationImage> */}
        </div>
        <div className="flex flex-col gap-6 p-4 w-full h-full 2md:w-[360px]">
          <div className="flex gap-4 items-center">
            <Image alt="" className="rounded-full w-10 h-10" width={40} height={40} src={user?.avatar || ""} />
            <div className="font-extralight text-base">{user?.name}</div>
          </div>

          <div className="flex flex-col gap-4 text-[20px] font-lato font-normal 2md:h-[380px] 2md:overflow-y-auto flex-grow flex-shrink">
            <div className="flex items-center gap-2 px-1">
              <input
                className={`duration-200 w-full ${
                  errors?.title ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
                placeholder="Tytuł"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.replace(/\s+/g, " "))}
              />
              <SmallPhotosIcon></SmallPhotosIcon>
            </div>
            <div className="flex items-center gap-2 px-1">
              <input
                className={`duration-200 w-full ${
                  errors?.author ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
                placeholder="Autor"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value.replace(/\s+/g, " "))}
              />
              <ProfileIcon height={24} width={24}></ProfileIcon>
            </div>
            <div className="flex items-center gap-2 px-1">
              <DropDownMenuWithSearch
                items={categories}
                startValue={bookCategory}
                setItem={setBookCategory}
                placeholder="Kategoria"
                inputClassName={`duration-200 w-full ${
                  errors?.category ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
                createNewItem
              ></DropDownMenuWithSearch>
              <TagIcon height={24} width={24}></TagIcon>
            </div>
            <div className="flex items-center gap-2 px-1">
              <DropDownMenuWithSearch
                items={languages}
                startValue={bookLanguage}
                setItem={setBookLanguage}
                placeholder="Język"
                inputClassName={`duration-200 w-full ${
                  errors?.language ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
                createNewItem
              ></DropDownMenuWithSearch>
              <LanguageIcon height={24} width={24}></LanguageIcon>
            </div>
            <div className="flex items-center gap-2 px-1">
              <DropDownMenuWithSearch
                items={bookStates}
                startValue={bookState}
                setItem={setBookState}
                placeholder="Stan"
                inputClassName={`duration-200 w-full ${
                  errors?.state ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
              ></DropDownMenuWithSearch>
              <LeafIcon height={24} width={24}></LeafIcon>
            </div>
            <div className="flex items-center gap-2 px-1">
              <input
                type="text"
                placeholder="Kontakt"
                value={messengerDescription}
                onChange={(e) => setMessengerDescription(e.target.value.replace(/\s+/g, " "))}
                className={`duration-200 w-full ${
                  errors?.messengerDescription
                    ? "text-red-600 placeholder:text-red-600"
                    : "text-black placeholder:text-[#6C6C6C]"
                }`}
              />

              <DropDownMenuWithChoose
                mode="icons"
                items={messengers}
                setItem={setMessenger}
                item={messenger}
              ></DropDownMenuWithChoose>
            </div>
            <div className="relative px-1">
              <textarea
                className="resize-none w-full placeholder:text-[#6C6C6C]"
                value={bookDescription}
                placeholder="Napisz komentarz"
                ref={textareaRef}
                maxLength={descriptionLength}
                onChange={(e) => {
                  const value = e.target.value;
                  e.target.style.height = 0 + "px";

                  e.target.style.height = e.target.scrollHeight + "px";

                  if (value.length > descriptionLength) value.slice(descriptionLength);
                  setBookDescription(value);
                }}
              ></textarea>
              <div className="absolute right-0 bottom-0 select-none text-sm text-[#767676] translate-y-1/2">
                {bookDescription.length}/{descriptionLength}
              </div>
            </div>
          </div>

          <div className="ml-auto">
            <Button
              onClick={() => {
                if (publicationData) {
                  const errors = isPublicationDataValid(publicationData);

                  if (errors.hasErrors) setErrors(errors);
                  else setCurrentStep((step) => step + 1);
                }
              }}
            >
              Podgląd
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useBook } from "@/components/contexts/BookProvider";
import { useUserData } from "@/components/contexts/UserProvider";
import useImagePicker from "@/components/hooks/useImagePicker";
import DropDownMenuWithChoose from "@/components/ui/DropDownMenuWithChoose";
import DropDownMenuWithSearch from "@/components/ui/DropDownMenuWithSearch";
import Button from "@/components/ui/buttons/Button";
import ArrowLeftIcon from "@/components/ui/icons/ArrowLeftIcon";
import LanguageIcon from "@/components/ui/icons/LanguageIcon";
import LeafIcon from "@/components/ui/icons/LeafIcon";
import PencilIcon from "@/components/ui/icons/PencilIcon";
import ProfileIcon from "@/components/ui/icons/ProfileIcon";
import SmallPhotosIcon from "@/components/ui/icons/SmallPhotosIcon";
import TagIcon from "@/components/ui/icons/TagIcon";
import getExtension from "@/lib/getExtension";
import isPublicationDataValid, { errors } from "@/lib/isPublicationDataValid";
import { allowedImageTypes } from "@/lib/variables";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { bookData } from "../Main";
import { messengers } from "../publication_menu/PublicationMenu";
import { bookStates, categories, languages } from "../publication_menu/StepTwo";
import { BookMenuMode } from "./BookMenu";

interface EditModeProps {
  setMode: Dispatch<SetStateAction<BookMenuMode>>;
}

const descriptionLength = 1000;

export default function EditMode({ setMode }: EditModeProps) {
  const { user } = useUserData();
  const { bookId, book, setBook, setBooks } = useBook();

  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [category, setCategory] = useState(book?.category || "");
  const [language, setLanguage] = useState(book?.language || "");
  const [state, setState] = useState(book?.state || "");
  const [description, setDescription] = useState(book?.description || "");
  const [messenger, setMessenger] = useState(book?.messenger || "");
  const [messengerDescription, setMessengerDescription] = useState(book?.messengerDescription || "");

  const [file, setFile] = useState<File>();
  const [image, setImage] = useState(book?.image || "");

  const [errors, setErrors] = useState<errors>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);

  const newData = {
    title,
    author,
    description,
    category,
    language,
    state,
    messenger,
    messengerDescription,
    date: book?.date || new Date(),
    image,
  };

  function openFileMenu() {
    if (fileRef.current) fileRef.current.click();
  }

  useImagePicker(fileRef, (e) => {
    e.preventDefault();

    const files = e.target.files;

    if (files[0]) {
      const extension = getExtension(files[0].name);

      if (extension && allowedImageTypes.includes(extension.toLowerCase())) {
        setFile(files[0]);
        setImage(URL.createObjectURL(files[0]));
      } else {
        toast.error("Wybierz format .png lub .jpeg");
      }
    }
  });

  function handleSubmit() {
    if (isLoading) return;

    if (book) {
      const errors = isPublicationDataValid({
        ...newData,
        image: book.image,
      });

      if (errors.hasErrors) setErrors(errors);
      else saveChanges();
    }
  }

  async function saveChanges() {
    if (!book) return;

    const newBook: bookData = {
      ...book,
      ...newData,
    };

    if (JSON.stringify(newBook) == JSON.stringify(book)) {
      setMode("view");
      toast.success("Dane zostały takie same");
      return;
    }

    async function updatePublication(data: { [key: string]: string | ArrayBuffer | undefined }) {
      async function fetchUpdate() {
        return new Promise(async (resolve, reject) => {
          try {
            const response = await fetch("/api/update-publication", {
              method: "post",
              body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error();

            setMode("view");

            setBook(newBook);

            if (data.image)
              setBooks((books) => {
                const updatedBook = books.find((book) => book.id == bookId);

                if (updatedBook?.image) updatedBook.image = image;

                return books;
              });

            resolve(1);
          } catch (error) {
            reject();
          }
        });
      }

      toast.promise(fetchUpdate(), {
        error: "Nie udało się zaktualizować dane",
        loading: "Aktualizujemy dane...",
        success: "Dane zostały zaktualizowane",
      });
    }

    setIsLoading(true);

    const reader = new FileReader();
    if (file) reader.readAsDataURL(file);
    else
      await updatePublication({
        id: book?.id,
        author,
        title,
        description,
        category,
        state,
        language,
        messenger,
        messengerDescription,
      });

    reader.onload = async (e) => {
      if (e.target?.result)
        await updatePublication({
          id: book?.id,
          author,
          title,
          description,
          category,
          state,
          language,
          messenger,
          messengerDescription,
          image: e.target.result,
        });
    };

    setIsLoading(false);
  }

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) textarea.style.height = textarea.scrollHeight + "px";
  }, []);

  return (
    <div className="flex flex-col h-full md:h-[610px]">
      <div className="hidden md:block p-3 relative text-center w-full">
        <div className="absolute cursor-pointer w-fit" onClick={() => setMode("view")}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </div>
        <div>Edytowanie</div>
      </div>
      <div className="flex flex-col md:flex-row h-full">
        <div className="flex w-full md:w-[400px] aspect-[3/4] relative shrink-0">
          <Image className="object-cover" fill src={"/api" + image || ""} priority alt="" />
          <div
            className="flex items-center justify-center cursor-pointer bg-black/40 gap-2.5 text-white w-full h-full absolute top-0 left-0"
            onClick={openFileMenu}
          >
            <input ref={fileRef} type="file" accept="image/png, image/jpeg" hidden />
            <PencilIcon color="white"></PencilIcon>
            <div>Zmień zdjęcie</div>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-4 w-full md:w-[360px]">
          <div className="flex gap-4 items-center">
            <img className="w-10 h-10 rounded-full" src={"/api" + user?.avatar} alt="" />
            <div className="font-extralight text-base">{user?.name}</div>
          </div>

          <div className="flex flex-col gap-4 text-[20px] font-lato font-normal md:h-[380px] md:overflow-y-auto flex-grow flex-shrink">
            <div className="flex items-center justify-between px-1">
              <input
                className={`duration-200 ${
                  errors?.title ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
                placeholder="Tytuł"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value.replace(/\s+/g, " "))}
              />
              <SmallPhotosIcon></SmallPhotosIcon>
            </div>
            <div className="flex items-center justify-between px-1">
              <input
                className={`duration-200 ${
                  errors?.author ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
                placeholder="Autor"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value.replace(/\s+/g, " "))}
              />
              <ProfileIcon height={24} width={24}></ProfileIcon>
            </div>
            <div className="flex items-center justify-between px-1">
              <DropDownMenuWithSearch
                items={categories}
                startValue={category}
                setItem={setCategory}
                placeholder="Kategoria"
                inputClassName={`duration-200 ${
                  errors?.category ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
                createNewItem
              ></DropDownMenuWithSearch>
              <TagIcon height={24} width={24}></TagIcon>
            </div>
            <div className="flex items-center justify-between px-1">
              <DropDownMenuWithSearch
                items={languages}
                startValue={language}
                setItem={setLanguage}
                placeholder="Język"
                inputClassName={`duration-200 ${
                  errors?.language ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
                createNewItem
              ></DropDownMenuWithSearch>
              <LanguageIcon height={24} width={24}></LanguageIcon>
            </div>
            <div className="flex items-center justify-between px-1">
              <DropDownMenuWithSearch
                items={bookStates}
                startValue={state}
                setItem={setState}
                placeholder="Stan"
                inputClassName={`duration-200 ${
                  errors?.state ? "text-red-600 placeholder:text-red-600" : "text-black placeholder:text-[#6C6C6C]"
                }`}
              ></DropDownMenuWithSearch>
              <LeafIcon height={24} width={24}></LeafIcon>
            </div>
            <div className="flex items-center justify-between px-1">
              <input
                type="text"
                placeholder="Kontakt"
                value={messengerDescription}
                onChange={(e) => setMessengerDescription(e.target.value.replace(/\s+/g, " "))}
                className={`duration-200 ${
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
                value={description}
                placeholder="Napisz komentarz"
                maxLength={descriptionLength}
                ref={textareaRef}
                onChange={(e) => {
                  const value = e.target.value;
                  e.target.style.height = 0 + "px";

                  e.target.style.height = e.target.scrollHeight + "px";

                  if (value.length > descriptionLength) value.slice(descriptionLength);
                  setDescription(value);
                }}
              ></textarea>
              <div className="absolute right-0 bottom-0 select-none text-sm text-[#767676] translate-y-1/2">
                {description.length}/{descriptionLength}
              </div>
            </div>
          </div>
          <div className="ml-auto">
            <Button className={`${isLoading ? "opacity-50 cursor-default" : "opacity-100"}`} onClick={handleSubmit}>
              Zapisz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useUserData } from "@/components/contexts/UserProvider";
import useImagePicker from "@/components/hooks/useImagePicker";
import SettingsButton from "@/components/ui/buttons/SettingsButton";
import { validateLogin } from "@/lib/isUserDataValid";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ChangePasswordMenu from "./ChangePasswordMenu";
import SettingsInput from "./SettingsInput";
import resizeImage from "@/lib/resizeImage";
import { image } from "../publication_menu/PublicationMenu";
import { useBook } from "@/components/contexts/BookProvider";
import ModalMenu from "@/components/ui/ModalMenu";
import ImagePreview from "@/components/ui/ImagePreview";

export default function ProfilePage() {
  const { user } = useUserData();
  const { setBooks, setFetchedBooks } = useBook();

  const [isChangePasswordMenuActive, setIsChangePasswordMenuActive] = useState(false);

  const [image, setImage] = useState<image>();
  const [previewImage, setPreviewImage] = useState<image>();

  const [isPreviewActive, setIsPreviewActive] = useState(false);

  // useEffect(() => {
  //   if (!isPreviewActive) setPreviewImage("");
  // }, [isPreviewActive]);

  const { file, pickImage } = useImagePicker();

  useEffect(() => {
    if (file)
      resizeImage({
        file: file,
        width: 384,
        callback: ({ url, data }) => {
          setPreviewImage({ url, data });
          setIsPreviewActive(true);
        },
      });
  }, [file]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const setAvatarPromise = new Promise(async (resolve, reject) => {
          try {
            const response = await fetch("/api/set-avatar", {
              method: "POST",
              body: JSON.stringify({ avatar: e.target?.result }),
            });

            if (!response.ok) throw new Error();

            user?.setAvatar(image.url);

            setBooks((books) => {
              const booksToChange = books.filter((book) => book.owner == user?.id);

              booksToChange.forEach((book) => {
                book.ownerData.avatar = image.url;
              });

              setFetchedBooks((fetchedBooks) => {
                booksToChange.forEach((book) => {
                  if (fetchedBooks[book.id]) fetchedBooks[book.id].ownerData.avatar = image.url;
                });

                return fetchedBooks;
              });

              return [...books];
            });

            resolve(1);
          } catch (e) {
            reject();
          }
        });

        toast.promise(setAvatarPromise, {
          success: "Zdjęcie zostało ustawione",
          loading: "Ustawiamy ci zdjęcie...",
          error: "Nie udało się ustawić zdjęcie",
        });
      };

      if (image?.data) reader.readAsDataURL(image.data);
    }
  }, [image]);

  return (
    <div className="flex flex-col gap-6 items-center lg:items-stretch">
      <div className="font-head text-[18px] whitespace-nowrap hidden lg:block">Mój profil</div>
      <hr className="w-full lg:hidden" />
      <div className="flex flex-col gap-1">
        <div className="font-extralight text-[14px]">Preferowany login</div>
        <SettingsInput value={user!.login} setValue={user!.setLogin} validator={validateLogin} />
      </div>
      <hr className="w-full" />
      <div>
        <SettingsButton onClick={pickImage}>Zmień zdjęcie profilowe</SettingsButton>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-1">
        <div className="font-extralight text-[14px]">Hasło</div>
        <SettingsButton onClick={() => setIsChangePasswordMenuActive(true)}>Zmień hasło</SettingsButton>
      </div>
      <ChangePasswordMenu isMenuActive={isChangePasswordMenuActive} setIsMenuActive={setIsChangePasswordMenuActive} />
      <ImagePreview
        isMenuActive={isPreviewActive}
        setIsMenuActive={setIsPreviewActive}
        image={previewImage}
        setImage={setImage}
      ></ImagePreview>
    </div>
  );
}

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

export default function ProfilePage() {
  const { user } = useUserData();
  const { setBooks, setFetchedBooks } = useBook();

  const [isChangePasswordMenuActive, setIsChangePasswordMenuActive] = useState(false);

  const [image, setImage] = useState<image>();

  const inputRef = useRef<HTMLInputElement>(null);

  useImagePicker(inputRef, (e) => {
    const file = e.target.files[0];

    if (file)
      resizeImage({
        file: file,
        width: 192,
        callback: ({ url, data }) => {
          setImage({
            url,
            data,
          });
        },
      });
  });

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
    <div className="flex flex-col gap-6 items-center md:items-stretch">
      <div className="font-head text-[18px] whitespace-nowrap hidden md:block">Mój profil</div>
      <hr className="w-full md:hidden" />
      <div className="flex flex-col gap-1">
        <div className="font-extralight text-[14px]">Preferowany login</div>
        <SettingsInput value={user!.login} setValue={user!.setLogin} validator={validateLogin} />
      </div>
      <hr className="w-full" />
      <div>
        <input hidden type="file" accept="image/png, image/jpeg" ref={inputRef} />
        <SettingsButton onClick={() => inputRef.current?.click()}>Zmień zdjęcie profilowe</SettingsButton>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-1">
        <div className="font-extralight text-[14px]">Hasło</div>
        <SettingsButton onClick={() => setIsChangePasswordMenuActive(true)}>Zmień hasło</SettingsButton>
      </div>
      <ChangePasswordMenu isMenuActive={isChangePasswordMenuActive} setIsMenuActive={setIsChangePasswordMenuActive} />
    </div>
  );
}

import { useUserData } from "@/components/contexts/UserProvider";
import useImagePicker from "@/components/hooks/useImagePicker";
import { validateLogin } from "@/lib/isUserDataValid";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ChangePasswordMenu from "./ChangePasswordMenu";
import SettingsInput from "./SettingsInput";
import SettingsButton from "@/components/ui/buttons/SettingsButton";

export default function ProfilePage() {
  const { user } = useUserData();

  const [isChangePasswordMenuActive, setIsChangePasswordMenuActive] = useState(false);
  const [isSetPasswordMenuActive, setIsSetPasswordMenuActive] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const file = useImagePicker(inputRef);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        const setAvatarPromise = new Promise(async (resolve, reject) => {
          try {
            const response = await fetch("/api/set-avatar", {
              method: "post",
              body: JSON.stringify({ avatar: e.target?.result }),
            });

            const { path } = await response.json();

            if (!response.ok) throw new Error();

            user?.setAvatar(path);

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
    }
  }, [file]);

  return (
    <div className="flex flex-col gap-6 items-center md:items-stretch">
      <div className="font-head text-[18px] whitespace-nowrap hidden md:block">Mój profil</div>
      <hr className="md:hidden w-full" />
      <div className="flex flex-col gap-1">
        <div className="font-extralight text-[14px]">Preferowany login</div>
        <SettingsInput value={user!.login} setValue={user!.setLogin} validator={validateLogin} />
      </div>
      {/* <div className="flex flex-col gap-1">
                <div className="font-extralight text-[14px]">Preferowane nazwisko</div>
                <SettingsInput value={user!.surname} setValue={user!.setSurname} validator={validateSurname} />
            </div> */}
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

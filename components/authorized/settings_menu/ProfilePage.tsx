import { useUserData } from "@/components/contexts/UserProvider";
import { validateName, validateSurname } from "@/lib/isUserDataValid";
import { useEffect, useRef, useState } from "react";
import SettingsInput from "./SettingsInput";
import ChangePasswordMenu from "./ChangePasswordMenu";
import SetPasswordMenu from "./SetPasswordMenu";
import useImagePicker from "@/components/hooks/useImagePicker";
import toast from "react-hot-toast";

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
            <div className="flex flex-col gap-1">
                <div className="font-extralight text-[14px]">Preferowane imię</div>
                <SettingsInput value={user!.name} setValue={user!.setName} validator={validateName} />
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-extralight text-[14px]">Preferowane nazwisko</div>
                <SettingsInput value={user!.surname} setValue={user!.setSurname} validator={validateSurname} />
            </div>
            <hr />
            <div>
                <input hidden type="file" accept="image/png, image/jpeg" ref={inputRef} />
                <div
                    className="border-[#BEBEBE] border w-fit p-2 px-4 font-extralight text-[14px] rounded-md cursor-pointer select-none"
                    onClick={() => inputRef.current?.click()}
                >
                    Zmień zdjęcie profilowe
                </div>
            </div>
            <hr />
            {user?.isPasswordExist ? (
                <>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Email</div>
                        <SettingsInput value={user!.email} setValue={user!.setEmail} type="email" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Hasło</div>
                        <div
                            className="border-[#BEBEBE] border w-fit p-2 px-4 font-extralight text-[14px] rounded-md cursor-pointer select-none"
                            onClick={() => setIsChangePasswordMenuActive(true)}
                        >
                            Zmień hasło
                        </div>
                    </div>
                    <ChangePasswordMenu
                        isMenuActive={isChangePasswordMenuActive}
                        setIsMenuActive={setIsChangePasswordMenuActive}
                    />
                </>
            ) : (
                <>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Hasło</div>
                        <div
                            className="border-[#BEBEBE] border w-fit p-2 px-4 font-extralight text-[14px] rounded-md cursor-pointer select-none"
                            onClick={() => setIsSetPasswordMenuActive(true)}
                        >
                            Ustaw hasło
                        </div>
                    </div>
                    <SetPasswordMenu
                        isMenuActive={isSetPasswordMenuActive}
                        setIsMenuActive={setIsSetPasswordMenuActive}
                    />
                </>
            )}
        </div>
    );
}

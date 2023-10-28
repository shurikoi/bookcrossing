import { Dispatch, SetStateAction, useState } from "react";
import ModalMenu from "../ui/ModalMenu";
import SettingsInput from "./SettingsInput";
import PasswordIcon from "../ui/icons/PasswordIcon";
import { validatePassword } from "@/lib/isUserDataValid";
import { useUserData } from "../contexts/UserProvider";
import Button from "../ui/buttons/Button";
import toast from "react-hot-toast";

interface SetPasswordMenuProps {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function SetPasswordMenu({ isMenuActive, setIsMenuActive }: SetPasswordMenuProps) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUserData();

    async function handleSubmit() {
        if (!validatePassword(newPassword).isValid) {
            toast.error("W haśle są pomyłki");
            return;
        }

        if (newPassword != confirmPassword) {
            toast.error("Hasła się nie zgadzają");
            return;
        }

        setIsLoading(true);

        const setPassword = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/set-password", {
                    method: "POST",
                    body: JSON.stringify({ password: newPassword }),
                });

                if (!response.ok && response.status > 400) throw new Error("Nie udało się ustawić hasło");

                const data = await response.json();

                if (!data.isValid) throw new Error("Sprawdź hasła na prawidłowość");

                if (user) user.setIsPasswordExist(true);

                resolve(1);
                
                setIsMenuActive(false);
            } catch (error) {
                reject(error);
            }

            setIsLoading(false);
        });

        toast.promise(setPassword, {
            error: (error) => `${error.toString().slice(6)}`,
            loading: "Ustawiamy hasło",
            success: "Hasło zostało ustawione",
        });
    }

    return (
        <ModalMenu isModalActive={isMenuActive} setIsModalActive={setIsMenuActive}>
            <div className="flex flex-col items-center text-center gap-5 py-8 px-16">
                <PasswordIcon />
                <div className="w-60">
                    <div className="font-light text-[17px]">Ustaw hasło</div>
                    <div className="font-extralight text-[12px] mt-1">
                        Utwórz silne hasło składające się z kombinacji liter, cyfr i symboli
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Podaj nowe hasło</div>
                        <SettingsInput value={newPassword} setValue={setNewPassword} type="password" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Powtórz</div>
                        <SettingsInput value={confirmPassword} setValue={setConfirmPassword} type="password" />
                    </div>
                </div>
                <Button isLoading={isLoading} onClick={handleSubmit}>
                    Potwierdź zmiany
                </Button>
            </div>
        </ModalMenu>
    );
}

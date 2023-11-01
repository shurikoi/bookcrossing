import { Dispatch, SetStateAction, useState } from "react";
import ModalMenu from "../../ui/ModalMenu";
import SettingsInput from "./SettingsInput";
import PasswordIcon from "../../ui/icons/PasswordIcon";
import ApplyChanges from "../../ui/buttons/Button";
import Button from "../../ui/buttons/Button";
import { validatePassword } from "@/lib/isUserDataValid";
import toast from "react-hot-toast";

interface ChangePasswordMenuProps {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function ChangePasswordMenu({ isMenuActive, setIsMenuActive }: ChangePasswordMenuProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

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
                    body: JSON.stringify({ currentPassword, newPassword }),
                });

                if (!response.ok && response.status > 400) throw new Error("Nie udało się ustawić hasło");

                const data = await response.json();

                if (!data.isValid) throw new Error("Sprawdź hasła na prawidłowość");

                resolve(1);

                setIsMenuActive(false);
            } catch (error) {
                reject(error);
            }

            setIsLoading(false);
        });

        toast.promise(setPassword, {
            error: (error) => `${error.toString().slice(6)}`,
            loading: "Ustawiamy nowe hasło",
            success: "Hasło zostało zaktualizowane",
        });
    }

    return (
        <ModalMenu isModalActive={isMenuActive} setIsModalActive={setIsMenuActive}>
            <div className="flex flex-col items-center text-center gap-8 py-8 pt-10 select-none px-16">
                <div className="flex flex-col items-center gap-1">
                    <PasswordIcon />
                    <div className="font-light text-[17px]">Zmień hasło</div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Podaj obecne hasło</div>
                        <SettingsInput value={currentPassword} setValue={setCurrentPassword} type="password" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Nowe hasło</div>
                        <SettingsInput value={newPassword} setValue={setNewPassword} type="password" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Nowe hasło</div>
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

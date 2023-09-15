import { Dispatch, SetStateAction, useState } from "react";
import ModalMenu from "../ui/ModalMenu";
import SettingsInput from "../ui/SettingsInput";
import PasswordIcon from "../ui/icons/PasswordIcon";
import { validatePassword } from "@/lib/isUserDataValid";
import { useUserData } from "../contexts/UserProviders";

interface SetPasswordMenuProps {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
}

export default function SetPasswordMenu({ isActive, setIsActive }: SetPasswordMenuProps) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const { user } = useUserData();

    function handleClick() {
        setIsLoading(true);

        if (!validatePassword(newPassword).isValid || newPassword != confirmPassword) {
            setTimeout(() => setIsLoading(false), 250);
            return;
        }

        fetch("/api/setPassword", {
            method: "POST",
            body: JSON.stringify({ newPassword }),
        })
            .then((response) => response.json())
            .then(() => user?.setIsPasswordExist(true));
    }
    // px-20 pt-12
    return (
        <ModalMenu isModalActive={isActive} setIsModalActive={setIsActive}>
            <div className="flex flex-col items-center text-center gap-5 py-8 px-16">
                <PasswordIcon />
                <div className="w-60">
                    <div className="font-light text-[17px]">Ustaw hasło</div>
                    <div className="font-extralight text-[11px]">
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
                <div
                    className={`${
                        isLoading ? "text-gray-500" : "text-[#61C558]"
                    } cursor-pointer duration-200 select-none`}
                    onClick={handleClick}
                >
                    Potwierdź zmiany
                </div>
            </div>
        </ModalMenu>
    );
}

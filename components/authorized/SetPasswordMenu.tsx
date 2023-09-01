import { Dispatch, SetStateAction, useState } from "react";
import ModalMenu from "../ui/ModalMenu";
import SettingsInput from "../ui/SettingsInput";
import PasswordIcon from "../ui/icons/PasswordIcon";

interface SetPasswordMenuProps {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
}

export default function SetPasswordMenu({ isActive, setIsActive }: SetPasswordMenuProps) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleClick(){
        fetch("/api/setPassword", {
            method: "POST",
            body: JSON.stringify({ newPassword})
        })
    }

    return (
        <ModalMenu modalActive={isActive} setModalActive={setIsActive} style={{ padding: "48px 80px 33px" }}>
            <div className="flex flex-col items-center text-center gap-5 w-60">
                <PasswordIcon />
                <div>
                    <div className="font-light text-[17px]">Ustaw hasło</div>
                    <div className="font-extralight text-[11px]">
                        Utwórz silne hasło składające się z kombinacji liter, cyfr i symboli
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Podaj nowe hasło</div>
                        <SettingsInput value={newPassword} setValue={setNewPassword} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Powtórz</div>
                        <SettingsInput value={confirmPassword} setValue={setConfirmPassword} />
                    </div>
                </div>
                <div className="text-[#61C558] cursor-pointer" onClick={handleClick}>Potwierdź zmiany</div>
            </div>
        </ModalMenu>
    );
}

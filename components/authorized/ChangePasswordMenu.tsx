import { Dispatch, SetStateAction, useState } from "react";
import ModalMenu from "../ui/ModalMenu";
import SettingsInput from "../ui/SettingsInput";
import PasswordIcon from "../ui/icons/PasswordIcon";

interface ChangePasswordMenu {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
}

export default function ChangePasswordMenu({ isActive, setIsActive }: ChangePasswordMenu) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <ModalMenu modalActive={isActive} setModalActive={setIsActive} style={{ padding: "40px 80px" }}>
            <div className="flex flex-col items-center text-center gap-8">
                <PasswordIcon/>
                <div className="font-light text-[17px]">Zmień hasło</div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Podaj obecne hasło</div>
                        <SettingsInput value={currentPassword} setValue={setCurrentPassword} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Nowe hasło</div>
                        <SettingsInput value={newPassword} setValue={setNewPassword} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Nowe hasło</div>
                        <SettingsInput value={confirmPassword} setValue={setConfirmPassword} />
                    </div>
                </div>
                <div className="text-[#61C558] cursor-pointer">Potwierdź zmiany</div>
            </div>
        </ModalMenu>
    );
}

import { Dispatch, SetStateAction, useState } from "react";
import ModalMenu from "../ui/ModalMenu";
import SettingsInput from "./SettingsInput";
import PasswordIcon from "../ui/icons/PasswordIcon";
import ApplyChanges from "../ui/buttons/Button";
import Button from "../ui/buttons/Button";

interface ChangePasswordMenuProps {
    isActive: boolean;
    setIsActive: Dispatch<SetStateAction<boolean>>;
}

export default function ChangePasswordMenu({ isActive, setIsActive }: ChangePasswordMenuProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function handleSubmit() {
        fetch("/api/set-password", {
            method: "POST",
            body: JSON.stringify({ password }),
        });
    }

    return (
        <ModalMenu isModalActive={isActive} setIsModalActive={setIsActive}>
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
                        <SettingsInput value={password} setValue={setPassword} type="password" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Nowe hasło</div>
                        <SettingsInput value={confirmPassword} setValue={setConfirmPassword} type="password" />
                    </div>
                </div>
                <Button onClick={handleSubmit}>Potwierdź zmiany</Button>
            </div>
        </ModalMenu>
    );
}

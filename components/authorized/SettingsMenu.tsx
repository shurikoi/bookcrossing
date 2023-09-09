import ModalMenu from "../ui/ModalMenu";
import { Dispatch, SetStateAction, useState } from "react";
import ProfileIcon from "../ui/icons/ProfileIcon";
import SettingsInput from "../ui/SettingsInput";
import ChangePasswordMenu from "./ChangePasswordMenu";
import { useUserData } from "../contexts/UserProviders";
import SetPasswordMenu from "./SetPasswordMenu";

interface SettingsMenuProps {
    isMenuActive: boolean;
    setIsMenuActive: Dispatch<SetStateAction<boolean>>;
}

type pages = "profile";

const settings = {
    profile: {
        title: "Mój profil",
        icon: <ProfileIcon width={27} height={27} />,
        page: <ProfilePage />,
    },
};

export default function SettingsMenu({ isMenuActive, setIsMenuActive }: SettingsMenuProps) {
    const { user } = useUserData();
    const [currentPage, setCurrentPage] = useState<pages>("profile");

    return (
        <ModalMenu fullMode isModalActive={isMenuActive} setIsModalActive={setIsMenuActive}>
            <div className="flex w-[900px] min-h-[600px]">
                <div className="bg-[#F1F1F1] flex flex-col gap-8 py-6 rounded-tl-lg rounded-bl-lg ">
                    <div className="font-normal px-6 text-[15px] text-[#5F5F5F]">Ustawienia</div>
                    <div>
                        <div className="font-normal px-6">
                            {user?.name} {user?.surname}
                        </div>
                        <div className="font-extralight px-6 text-[#575757]">{user?.email}</div>
                    </div>
                    <div>
                        {Object.values(settings).map((settingsItem) => (
                            <div className="flex items-center gap-3 bg-[#E6E6E6] px-6 py-2" key={settingsItem.title}>
                                {settingsItem.icon}
                                <div>{settingsItem.title}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-6 w-full">{settings[currentPage].page}</div>
            </div>
        </ModalMenu>
    );
}

function ProfilePage() {
    const { user } = useUserData();
    const [isChangePasswordMenuActive, setIsChangePasswordMenuActive] = useState(false);
    const [isSetPasswordMenuActive, setIsSetPasswordMenuActive] = useState(true);
    return (
        <div className="flex flex-col gap-6">
            <div className="font-head text-[18px] whitespace-nowrap">Mój profil</div>
            <div className="flex flex-col gap-1">
                <div className="font-extralight text-[14px]">Preferowane imię</div>
                <SettingsInput value={user!.name} setValue={user!.setName} type="name" />
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-extralight text-[14px]">Preferowane nazwisko</div>
                <SettingsInput value={user!.surname} setValue={user!.setSurname} type="surname" />
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
                            className="border-[#BEBEBE] border w-fit p-2 px-4 font-extralight text-[14px] rounded-md cursor-pointer"
                            onClick={() => setIsChangePasswordMenuActive(true)}
                        >
                            Zmień hasło
                        </div>
                    </div>
                    <ChangePasswordMenu
                        isActive={isChangePasswordMenuActive}
                        setIsActive={setIsChangePasswordMenuActive}
                    />
                </>
            ) : (
                <>
                    <div className="flex flex-col gap-1">
                        <div className="font-extralight text-[14px]">Hasło</div>
                        <div
                            className="border-[#BEBEBE] border w-fit p-2 px-4 font-extralight text-[14px] rounded-md cursor-pointer"
                            onClick={() => setIsSetPasswordMenuActive(true)}
                        >
                            Ustaw hasło
                        </div>
                    </div>
                    <SetPasswordMenu
                        isActive={isSetPasswordMenuActive}
                        setIsActive={setIsSetPasswordMenuActive}
                    />
                </>
            )}
        </div>
    );
}

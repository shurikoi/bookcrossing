import { Dispatch, SetStateAction, useState } from "react";
import { useUserData } from "../../contexts/UserProvider";
import ModalMenu from "../../ui/ModalMenu";
import ProfileIcon from "../../ui/icons/ProfileIcon";
import ProfilePage from "./ProfilePage";

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



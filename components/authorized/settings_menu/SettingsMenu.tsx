import { Dispatch, SetStateAction, useState } from "react";
import { useUserData } from "../../contexts/UserProvider";
import ModalMenu from "../../ui/ModalMenu";
import ProfileIcon from "../../ui/icons/ProfileIcon";
import ProfilePage from "./ProfilePage";
import Image from "next/image";

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
        <ModalMenu
            fullMode
            isModalActive={isMenuActive}
            header={<div className="font-normal text-[15px] text-[#5F5F5F]">Ustawienia</div>}
            setIsModalActive={setIsMenuActive}
        >
            <div className="flex flex-col items-center text-center md:text-left md:items-start md:flex-row md:w-[900px] md:min-h-[600px]">
                <div className="md:bg-[#F1F1F1] flex flex-col gap-8 md:py-6 rounded-tl-lg rounded-bl-lg md:min-h-[inherit]">
                    <div className="flex flex-col gap-6 px-6 items-center md:items-start">
                        <div className="hidden md:block font-normal text-[15px] text-[#5F5F5F]">Ustawienia</div>
                        <Image
                            quality={100}
                            height={96}
                            width={96}
                            alt=""
                            src={user?.avatar || ""}
                            className={`border-2 border-[#61C558] p-1 md:p-0 md:border-0 w-24 h-24 md:w-16 md:h-16 rounded-full`}
                        ></Image>
                        <div>
                            <div className="font-normal">
                                {user?.name} {user?.surname}
                            </div>
                            <div className="font-extralight text-[#575757]">{user?.email}</div>
                        </div>
                    </div>
                    <div className="hidden md:block">
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

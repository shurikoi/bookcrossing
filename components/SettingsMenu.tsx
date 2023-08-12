import { useSession } from "next-auth/react";
import ModalMenu from "./ui/ModalMenu";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import ProfileIcon from "./ui/ProfileIcon";
import SettingsInput from "./ui/SettingsInput";
import ChangePasswordMenu from "./ChangePasswordMenu";

interface SettingsMenu {
    isSettingsMenuActive: boolean;
    setIsSettingsMenuActive: Dispatch<SetStateAction<boolean>>;
}

type settings = "profile";

const settings = {
    profile: {
        title: "Mój profil",
        icon: <ProfileIcon width={27} height={27} />,
        page: <ProfilePage />,
    },
};

export default function SettingsMenu({ isSettingsMenuActive, setIsSettingsMenuActive }: SettingsMenu) {
    const { data: session } = useSession();
    const [currentPage, setCurrentPage] = useState<settings>("profile");

    return (
        <ModalMenu modalActive={isSettingsMenuActive} setModalActive={setIsSettingsMenuActive}>
            <div className="flex w-[900px] min-h-[600px]">
                <div className="bg-[#F1F1F1] flex flex-col gap-8 py-6 rounded-tl-lg rounded-bl-lg ">
                    <div className="font-normal px-6 text-[15px] text-[#5F5F5F]">Ustawienia</div>
                    <div>
                        <div className="font-normal px-6">
                            {session?.user.name} {session?.user.surname}
                        </div>
                        <div className="font-extralight px-6 text-[#575757]">{session?.user.email}</div>
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
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");

    const [isChangePasswordMenuActive, setIsChangePasswordMenuActive] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-6">
            <div className="font-head text-[18px]">Mój profil</div>
            <div className="flex flex-col gap-1">
                <div className="font-extralight text-[14px]">Preferowane imię</div>
                <SettingsInput value={name} setValue={setName} />
            </div>
            <div className="flex flex-col gap-1">
                <div className="font-extralight text-[14px]">Preferowane nazwisko</div>
                <SettingsInput value={surname} setValue={setSurname} />
            </div>
            <hr />
            <div className="flex flex-col gap-1">
                <div className="font-extralight text-[14px]">Email</div>
                <SettingsInput value={email} setValue={setEmail} />
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
            <ChangePasswordMenu isActive={isChangePasswordMenuActive} setIsActive={setIsChangePasswordMenuActive}/>
        </div>
    );
}

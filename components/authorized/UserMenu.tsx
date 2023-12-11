import { signOut } from "next-auth/react";
import { Dispatch, RefObject, SetStateAction } from "react";
import { useUserData } from "../contexts/UserProvider";
import DropDownMenu from "../ui/DropDownMenu";
interface UserMenuProps {
  isMenuActive: boolean;
  setIsSettingsMenuActive: Dispatch<SetStateAction<boolean>>;
  setMenuActive: Dispatch<SetStateAction<boolean>>;
  triggerRef: RefObject<HTMLDivElement>;
}
export default function UserMenu({ isMenuActive, setIsSettingsMenuActive, setMenuActive, triggerRef }: UserMenuProps) {
  const { user } = useUserData();

  return (
    <DropDownMenu
      isMenuActive={isMenuActive}
      setIsMenuActive={setMenuActive}
      triggerRef={triggerRef}
      className="absolute right-1/2 translate-x-1/2 lg:translate-x-0 -bottom-3 translate-y-[100%] lg:right-0 shadow-lg rounded-lg flex flex-col gap-2 bg-white pt-5 py-3.5 lg:py-6 w-[80vw] lg:w-auto lg:px-4 text-center lg:text-left"
    >
      <div className="flex flex-col px-3">
        <div className="font-normal whitespace-pre">
          {user?.name} {user?.surname}
        </div>
        <div className="font-extralight">{user?.login}</div>
      </div>
      <div className="flex flex-col select-none">
        <div
          className="p-3 lg:pr-48 cursor-pointer duration-200 font-normal rounded-md hover:bg-[#F2F9F0]"
          onClick={() => {
            setMenuActive(false);
            setIsSettingsMenuActive(true);
          }}
        >
          Ustawienia
        </div>
        <div
          className="p-3 lg:pr-48 cursor-pointer duration-200 font-normal rounded-md hover:bg-[#F2F9F0]"
          onClick={() => signOut({ redirect: false })}
        >
          Wyloguj
        </div>
      </div>
    </DropDownMenu>
  );
}

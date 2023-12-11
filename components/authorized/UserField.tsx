"use client"

import Image from "next/image";
import { useRef, useState } from "react";
import { useUserData } from "../contexts/UserProvider";
import UserMenu from "./UserMenu";
import SettingsMenu from "./settings_menu/SettingsMenu";

export default function UserField() {
  const { user } = useUserData();

  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isSettingsMenuActive, setIsSettingsMenuActive] = useState(false);
  
  const triggerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row items-center gap-4 lg:gap-[30px]">
        <div className="flex items-center gap-[30px]">
          <div className="flex items-center gap-6 bg-white border-[#DFDFE0] border-[3px] rounded-full px-3 py-1">
            <Image src="/images/image 1359.png" alt="" width={20} height={20}></Image>
            <div className="text-lg font-normal">{user?.points}</div>
          </div>
        </div>

        <div className="relative" ref={triggerRef}>
          <div
            className="flex items-center gap-2 text-xl font-normal text-white cursor-pointer"
            onClick={() => setIsMenuActive((menuActive) => !menuActive)}
          >
            <div className="select-none">{user?.name}</div>
            <svg
              className="mt-1 "
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.5 12.125L0 0.875H15L7.5 12.125Z" fill="white" />
            </svg>
          </div>
          <UserMenu
            isMenuActive={isMenuActive}
            setIsSettingsMenuActive={setIsSettingsMenuActive}
            setMenuActive={setIsMenuActive}
            triggerRef={triggerRef}
          />
        </div>
      </div>

      <SettingsMenu isMenuActive={isSettingsMenuActive} setIsMenuActive={setIsSettingsMenuActive} />
    </>
  );
}

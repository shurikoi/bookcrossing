import Image from "next/image";
import { memo } from "react";
import UserField from "./UserField";

const Header = memo(() => {
  return (
    <>
      <header className="bg-black z-10 flex items-center flex-col lg:flex-row gap-4 lg:gap-0 py-4 px-10 relative box-border">
        <div className="flex items-center justify-between lg:mr-auto">
          <div className="text-2xl text-white font-head">BookCrossing</div>
        </div>
        <UserField></UserField>
        <Image src="/images/header.png" alt="" className="bg-[black] object-cover -z-10" priority fill></Image>
      </header>
    </>
  );
});

Header.displayName = "Header";

export default Header;

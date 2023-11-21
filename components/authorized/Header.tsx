import { memo } from "react";
import UserField from "./UserField";

const Header = memo(() => {
  return (
    <>
      <header className="bg-black z-10 flex items-center flex-col md:flex-row gap-4 md:gap-0 py-4 px-10 relative box-border bg-no-repeat bg-cover bg-center bg-[url(/images/header.png)]">
        <div className="flex items-center justify-between md:mr-auto">
          <div className="text-2xl text-white font-head">BookCrossing</div>
        </div>
        <UserField></UserField>
      </header>
    </>
  );
});

Header.displayName = "Header";

export default Header;

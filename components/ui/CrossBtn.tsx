import { Dispatch, SetStateAction, useContext } from "react";
import { FormContext } from "@/components/contexts/FormContext";

export default function crossBtn({setMenuActive} : {setMenuActive : Dispatch<SetStateAction<boolean>>}) {

    return (
        <div className="absolute right-0 top-0 w-[35px] h-[35px] translate-x-[calc(100%+10px)] rounded-full cursor-pointer" onClick={() => setMenuActive(false)}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M18.0035 0.508789C27.66 0.508789 35.5 8.34879 35.5 18.0035C35.5 27.66 27.66 35.5 18.0035 35.5C8.34879 35.5 0.508789 27.66 0.508789 18.0035C0.508789 8.34879 8.34879 0.508789 18.0035 0.508789ZM18.0035 16.1415L13.2418 11.378C12.9863 11.1225 12.6485 10.9948 12.3125 10.9948C11.6055 10.9948 11 11.5618 11 12.3055C11 12.6433 11.1278 12.9775 11.3833 13.2348L16.1468 17.9983L11.3728 22.7723C11.1155 23.0295 10.9878 23.3673 10.9878 23.7015C10.9878 24.4488 11.6003 25.014 12.302 25.014C12.638 25.014 12.974 24.8863 13.2295 24.6308L18.0035 19.8568L22.7793 24.6308C23.0348 24.8863 23.3708 25.014 23.7068 25.014C24.4085 25.014 25.0193 24.4488 25.0193 23.7015C25.0193 23.3673 24.8915 23.0295 24.6343 22.7723L19.862 17.9983L24.6168 13.2435C24.8723 12.9863 25 12.652 25 12.3143C25 11.5705 24.3945 11.0018 23.6875 11.0018C23.3515 11.0018 23.0138 11.1295 22.7583 11.3868L18.0035 16.1415Z"
                    fill="white"
                    fillOpacity="0.5"
                />
            </svg>
        </div>
    );
}

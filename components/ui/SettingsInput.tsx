import { useSession } from "next-auth/react";
import { Dispatch, FormEvent, SetStateAction } from "react";

interface SettingsInput{
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    type: "name" | "surname" | "email"
}

export default function SettingsInput({ value, setValue, type}: SettingsInput) {
    
    function handleInput(e : FormEvent<HTMLInputElement>){
        const target = e.target as HTMLInputElement
        setValue(target.value)
    }

    return (
        <input
            value={value}
            onInput={handleInput}
            type="text"
            className="font-extralight text-[14px] p-1 bg-[#EFEFEF] border-[#BEBEBE] rounded-md border w-60"
        />
    );
}
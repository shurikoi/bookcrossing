import { Dispatch, SetStateAction } from "react";

interface SettingsInput {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function SettingsInput({ value, setValue }: SettingsInput) {
    return (
        <input
            value={value}
            onInput={(e) => setValue((e.target as HTMLInputElement).value)}
            type="text"
            className="font-extralight text-[14px] p-1 bg-[#EFEFEF] border-[#BEBEBE] rounded-md border w-60"
        />
    );
}
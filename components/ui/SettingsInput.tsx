import React, { Dispatch, FormEvent, SetStateAction } from "react";

interface SettingsInputProps {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    type?: "name" | "surname" | "email";
}

const SettingsInput = React.memo(({ value, setValue, type }: SettingsInputProps) => {
    function handleInput(e: FormEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
    }

    return (
        <input
            value={value}
            onInput={handleInput}
            type="text"
            className="font-extralight text-[14px] p-1 bg-[#EFEFEF] border-[#BEBEBE] rounded-md border w-60"
        />
    );
});

export default SettingsInput;

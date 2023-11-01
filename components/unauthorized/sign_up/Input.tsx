import ShowPasswordBtn from "@/components/ui/buttons/ShowPasswordBtn";
import WarningIcon from "@/components/ui/icons/WarningIcon";
import { Dispatch, SetStateAction, useState } from "react";

interface InputProps extends React.HTMLAttributes<HTMLElement> {
    errorMessage?: string;
    isPasswordInput?: boolean;
    isRequired?: boolean;
    isValid?: boolean;
    placeholder: string;
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export default function Input({
    isPasswordInput = false,
    isRequired = false,
    isValid = true,
    errorMessage = "",
    placeholder = "",
    value,
    setValue,
    ...props
}: InputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <div className="relative border-[#61C558] border rounded-lg px-4 py-2.5 flex justify-between w-full gap-3 font-extralight">
            {isRequired && <div className="text-[24px] text-[#61C558] absolute -right-3 -top-3">*</div>}
            <input
                type={isPasswordInput ? (isPasswordVisible ? "text" : "password") : "text"}
                placeholder={placeholder}
                className="w-full"
                value={value}
                autoCapitalize="off"
                onChange={(e) => setValue(e.target.value.trim())}
                onKeyDown={props.onKeyDown}
            />
            {isPasswordInput && (
                <ShowPasswordBtn
                    onClick={() => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible)}
                    isPasswordVisible={isPasswordVisible}
                ></ShowPasswordBtn>
            )}
            {!isValid && (
                <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-5 left-0">
                    <>
                        <WarningIcon />
                        <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
                            {errorMessage}
                        </div>
                    </>
                </div>
            )}
        </div>
    );
}

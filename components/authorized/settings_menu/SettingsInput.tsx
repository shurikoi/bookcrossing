import { Dispatch, FormEvent, SetStateAction, memo, useRef, useState } from "react";
import WarningIcon from "../../ui/icons/WarningIcon";

interface SettingsInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  type?: "email" | "text" | "password";
  validator?: (arg: string) => {
    isValid: boolean;
    error?: string;
    errors?: {
      length: boolean;
      numbers: boolean;
    };
  };
}

const SettingsInput = memo(({ value, setValue, type = "text", validator }: SettingsInputProps) => {
  const [error, setError] = useState<string | undefined>();
  const timerRef = useRef<NodeJS.Timer | null>(null);

  function handleInput(e: FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    if (validator) {
      setError(undefined);

      const { isValid, error } = validator(target.value);

      if (!isValid) setError(error);
    }

    setValue(target.value.trim());
  }

  return (
    <div className="relative">
      <input
        value={value}
        autoCapitalize="off"
        autoComplete="new-password"
        onInput={handleInput}
        type={type}
        maxLength={20}
        className="font-extralight text-[14px] p-1 bg-[#EFEFEF] border-[#BEBEBE] shadow-sm rounded-md border w-60"
      />
      {error && (
        <div className="absolute flex items-center gap-1 whitespace-nowrap -bottom-5 left-0">
          <>
            <WarningIcon />
            <div className=" text-[#DD0000] font-inter font-normal text-[13px] h-[1em] leading-none">
              {error}
            </div>
          </>
        </div>
      )}
    </div>
  );
});

SettingsInput.displayName = "SettingsInput"

export default SettingsInput;

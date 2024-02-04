import { signIn } from "next-auth/react";
import { Dispatch, KeyboardEvent, SetStateAction, useEffect, useRef, useState } from "react";
import ModalMenu from "../ui/ModalMenu";
import Button from "../ui/buttons/Button";

export type currentState = "default" | "signin" | "signup";

interface AuthFormProps {
  setIsFormActive: Dispatch<SetStateAction<boolean>>,
  isFormActive: boolean
}

export default function AuthForm({ isFormActive, setIsFormActive }: AuthFormProps) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginValid, setIsLoginValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isFormActive && firstInputRef.current && firstInputRef.current.value.length == 0) firstInputRef?.current.focus()
  }, [isFormActive, firstInputRef])

  async function handleSubmit() {
    setIsLoading(true);

    const response = await fetch("/api/check-user", {
      method: "POST",
      body: JSON.stringify({ login, password }),
    });

    const { isExist, isValid } = await response.json();

    if (isExist && isValid) signIn("credentials", { login, password });
    else setIsLoading(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLFormElement>) {
    if (e.key == "Enter") handleSubmit();
  }

  return (
    <ModalMenu isModalActive={isFormActive} setIsModalActive={setIsFormActive}>
      <form className="flex items-center flex-col gap-4 w-full 2md:max-w-[500px] text-center px-6 py-8 sm:p-10" onKeyDown={handleKeyDown}>
        <div className="flex gap-3 flex-col items-center">
          <div className="font-medium text-[20px] sm:text-[24px]">Zaloguj się w kilka sekund</div>
          <div className="text-[13px] font-extralight">
            Jesteś uczniem SEI w Łodzi? <br />
            Użyj otrzymany przez Librus login
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <input
            ref={firstInputRef}
            type="text"
            autoCapitalize="false"
            autoComplete="email"
            name="login"
            placeholder="Login"
            className="placeholder:font-light relative border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px] flex justify-between duration-300 w-full 2md:w-auto gap-3"
            value={login}
            onChange={(e) => {
              setLogin(e.target.value.trim());
            }}
          />

          <input
            type="password"
            autoCapitalize="false"
            name="password"
            autoComplete="password"
            placeholder="Hasło"
            className="placeholder:font-light relative border-[#61C558] border rounded-lg px-4 py-2.5 text-[15px] flex justify-between duration-300 w-full 2md:w-auto gap-3"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value.trim());
            }}
          />
        </div>
        <Button disabled={isLoading} onClick={handleSubmit}>
          Zaloguj
        </Button>
        {/* <div className="font-normal text-[15px]">Lub</div>
        <div
          className="flex gap-4 px-5 py-3 items-center bg-[#EFEFEF] rounded-lg cursor-pointer"
          onClick={openGoogleSignIn}
        >
          <Image alt="" src="/images/google.png" width={25} height={25}></Image>
          <div className="font-light text-[16px] text-[#525252] select-none whitespace-nowrap">
            Kontynuuj przez Google
          </div>
        </div> */}
      </form>
    </ModalMenu>
  );
}

// flex items-center flex-col gap-8 w-full 2md:max-w-[500px] text-center px-6 py-8 sm:px-10 sm:py-14

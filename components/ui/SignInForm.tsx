import { useContext, useEffect, useRef, useState } from "react";
import { FormContext } from "./FormProvider";
import CrossBtn from "@/components/ui/CrossBtn";
import ArrowBtn from "@/components/ui/ArrowBtn";
import Image from "next/image";

export default function signInForm() {
    const { formActive, setFormActive } = useContext(FormContext);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!formActive) return;

        function checkClickOutside(e: MouseEvent) {
            if (!formRef.current?.contains(e.target as HTMLElement)) {
                setFormActive((formActive: boolean) => {});
            }
        }

        document.addEventListener("click", checkClickOutside);

        return () => {
            document.removeEventListener("click", checkClickOutside);
        };
    }, [formActive, formRef]);

    return (
        <div
            className={`flex items-center justify-center fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  w-screen h-screen bg-black/50  duration-300 ${
                formActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            }`}
        >
            <form
                ref={formRef}
                className={`relative flex flex-col gap-9 max-w-[460px] px-14 py-10 bg-white shadow-sm text-center rounded-lg `}
            >
                <CrossBtn></CrossBtn>
                <div className="text-2xl font-semibold">Zaloguj się lub zarejestruj w kilka sekund</div>
                <div className="text-[13px] font-extralight">
                    Użyj adresu e-mail. Sprawdzimy, czy już masz konto. Jeśli nie, pomożemy Ci je utworzyć.
                </div>
                <div className="border-[#61C558] border-2 rounded-lg px-4 py-2.5 text-[15px] flex justify-between">
                    <input type="text" placeholder="myemail@example.com" className="outline-none" />
                    <ArrowBtn></ArrowBtn>
                </div>
                <div className="font-medium text-[15px]">Lub</div>
                <div className="flex gap-6 px-5 py-3 items-center bg-[#EFEFEF] rounded-lg">
                    <Image alt="" src="/images/google.png" width={25} height={25}></Image>
                    <div className="font-extralight cursor-pointer">Kontynuuj przez Google</div>
                </div>
            </form>
        </div>
    );
}

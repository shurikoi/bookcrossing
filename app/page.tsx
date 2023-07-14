"use client";

import Header from "@/components/ui/Header";
import Advantages from "@/components/ui/Advantages";
import GetStarted from "@/components/ui/GetStarted";
import SignInForm from "@/components/ui/SignInForm";
import { FormProvider } from "@/components/ui/FormProvider";
import Image from "next/image";


export default function Home() {

    return (
        <>
            <FormProvider>
                <Header></Header>
                <Advantages></Advantages>

                <Image
                    src="/images/divide-line.svg"
                    style={{ width: "100%", height: "auto" }}
                    alt=""
                    width={0}
                    height={0}
                ></Image>

                <GetStarted></GetStarted>
                <SignInForm></SignInForm>
            </FormProvider>
        </>
    );
}

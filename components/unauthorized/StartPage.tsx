import Image from "next/image";
import Advantages from "./Advantages";
import Header from "./Header";
import GetStarted from "./GetStarted";
import AuthForm from "./AuthForm";
import { FormModalProvider } from "../contexts/FormModalProvider";
import { useEffect } from "react";

export default function StartPage() {
    // useEffect(() => {
    //     test(3)
    // }, [])

    return (
        <FormModalProvider>
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
            <AuthForm></AuthForm>
        </FormModalProvider>
    );
}

import Image from "next/image";
import Advantages from "./Advantages";
import Header from "./Header";
import GetStarted from "./GetStarted";
import AuthForm from "./AuthForm";
import { FormProvider } from "../contexts/FormContext";

export default function StartPage() {
    return (
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
            <AuthForm></AuthForm>
        </FormProvider>
    );
}

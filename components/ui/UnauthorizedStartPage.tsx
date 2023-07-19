import Image from "next/image";
import Advantages from "./Advantages";
import Header from "./UnathorizedHeader";
import GetStarted from "./GetStarted";
import AuthForm from "./AuthForm";
import { FormProvider } from "./FormProvider";

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

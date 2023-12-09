import Image from "next/image";
import { useEffect, useState } from "react";
import Advantages from "./Advantages";
import AuthForm from "./AuthForm";
import GetStarted from "./GetStarted";
import Header from "./Header";
import { signOut, useSession } from "next-auth/react";

export default function StartPage() {
  const [isFormActive, setIsFormActive] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user?.unauthenticated) signOut();
  }, [session]);

  return (
    <>
      <Header setIsFormActive={setIsFormActive}></Header>
      <Advantages></Advantages>
      <Image
        src="/images/divide-line.svg"
        style={{ width: "100%", height: "auto" }}
        alt=""
        width={0}
        height={0}
      ></Image>
      <GetStarted setIsFormActive={setIsFormActive}></GetStarted>
      <AuthForm isFormActive={isFormActive} setIsFormActive={setIsFormActive}></AuthForm>
    </>
  );
}

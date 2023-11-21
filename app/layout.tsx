import "./globals.css";
import { eUkraine, eUkraineHead, inter, lato } from "@/components/fonts";
import { ScreenProvider } from "@/components/contexts/ScreenProvider";
import { Toaster } from "react-hot-toast";
import { getUserSession } from "./api/auth/[...nextauth]/route";
import SessionProvider from "@/components/contexts/SessionProvider";
import { cloneElement } from "react";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getUserSession();

  return (
    <html lang="en">
      <head>
        <title>Bookcrossing</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </head>
      <body
        style={{ overflow: "hidden" }}
        className={`${eUkraine.className} ${eUkraineHead.variable} ${inter.variable} ${lato.variable} bg-white`}
      >
        <SessionProvider session={JSON.parse(JSON.stringify(session))}>
          <ScreenProvider>
            <Toaster position="top-center"></Toaster>
            {children}
          </ScreenProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

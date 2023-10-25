"use client";

import "./globals.css";
import { eUkraine, eUkraineHead, inter, lato } from "@/components/fonts";
import SessionProvider from "@/components/contexts/SessionProvider";
import { ScreenProvider } from "@/components/contexts/ScreenProvider";
import Head from "next/head";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ScreenProvider>
                <html lang="en">
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                        <title>Bookcrossing</title>
                    </Head>
                    <body className={`${eUkraine.className} ${eUkraineHead.variable} ${inter.variable} ${lato.variable} bg-white`}>
                        <Toaster position="top-center"></Toaster>
                        {children}
                    </body>
                </html>
            </ScreenProvider>
        </SessionProvider>
    );
}

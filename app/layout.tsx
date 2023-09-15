"use client";

import "./globals.css";
import { eUkraine, eUkraineHead, inter } from "@/components/fonts";
import SessionProvider from "@/components/contexts/SessionProvider";
import { ScreenProvider } from "@/components/contexts/ScreenProvider";
import Head from "next/head";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ScreenProvider>
                <html lang="en">
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
                        <title>Bookcrossing</title>
                    </Head>
                    <body className={`${eUkraine.className} ${eUkraineHead.variable} ${inter.variable} bg-white`}>
                        {children}
                    </body>
                </html>
            </ScreenProvider>
        </SessionProvider>
    );
}

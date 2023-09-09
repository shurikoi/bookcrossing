"use client";

import "./globals.css";
import { eUkraine, eUkraineHead, inter } from "@/components/fonts";
import SessionProvider from "@/components/contexts/SessionProvider";
import { ScreenProvider } from "@/components/contexts/ScreenProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ScreenProvider>
                <html lang="en">
                    <head>
                        <title>Bookcrossing</title>
                    </head>
                    <body className={`${eUkraine.className} ${eUkraineHead.variable} ${inter.variable} bg-white`}>
                        {children}
                    </body>
                </html>
            </ScreenProvider>
        </SessionProvider>
    );
}

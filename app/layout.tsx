"use client";

import "./globals.css";
import type { Metadata } from "next";
import { eUkraine, eUkraineHead, inter } from "@/components/fonts";
import SessionProvider from "@/components/contexts/SessionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <html lang="en">
                <head>
                    <title>Bookcrossing</title>
                </head>
                <body className={`${eUkraine.className} ${eUkraineHead.variable} ${inter.variable} bg-white`}>
                    {children}
                </body>
            </html>
        </SessionProvider>
    );
}

import "./globals.css";
import type { Metadata } from "next";
import { eUkraine, eUkraineHead, inter } from "@/components/fonts";

export const metadata: Metadata = {
    title: "Bookcrossing",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${eUkraine.className} ${eUkraineHead.variable} ${inter.variable} bg-white`}>{children}</body>
        </html>
    );
}

import "./globals.css";
import type { Metadata } from "next";
import { eUkraine } from "@/components/ui/fonts";

export const metadata: Metadata = {
    title: "Bookcrossing",
    description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${eUkraine.className} bg-white`}>{children}</body>
        </html>
    );
}

"use client"

import MainLayout from "@/components/MainLayout";
import SessionProvider from "@/components/contexts/SessionProvider";

export default function Home() {
    return (
        <>
            <SessionProvider>
                <MainLayout />
            </SessionProvider>
        </>
    );
}

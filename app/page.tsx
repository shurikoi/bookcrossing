"use client";

import MainLayout from "@/components/ui/MainLayout";
import SessionProvider from "@/components/ui/SessionProvider";

export default async function Home() {
    return (
        <>
            <SessionProvider>
                <MainLayout />
            </SessionProvider>
        </>
    );
}

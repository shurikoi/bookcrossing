"use client"

import { createContext, useContext, useEffect, useState } from "react";

const ScreenContext = createContext<any>(null);

function ScreenProvider({ children }: { children: React.ReactNode }) {
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        checkScreenSize();

        function checkScreenSize() {
            setIsSmallScreen(window.innerWidth < 768);
        }

        window.addEventListener("resize", checkScreenSize);

        return () => {
            window.removeEventListener("resize", checkScreenSize);
        }
    }, []);

    return <ScreenContext.Provider value={{ isSmallScreen }}>{children}</ScreenContext.Provider>;
}

function useScreen() {
    const screen = useContext(ScreenContext);
    
    return screen;
}

export { ScreenProvider, useScreen };


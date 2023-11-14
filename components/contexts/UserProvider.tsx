"use client";

import { validateUserData } from "@/lib/isUserDataValid";
import { signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const UserContext = createContext<any>(null);

type userData = {
    loading: boolean;
    user?: {
        id: string;
        name: string;
        surname: string;
        email: string;
        points: number;
        isPasswordExist: boolean;
        avatar: string;
        setAvatar: Dispatch<SetStateAction<string>>;
        setName: Dispatch<SetStateAction<string>>;
        setSurname: Dispatch<SetStateAction<string>>;
        setEmail: Dispatch<SetStateAction<string>>;
        setPoints: Dispatch<SetStateAction<number>>;
        setIsPasswordExist: Dispatch<SetStateAction<boolean>>;
    };
};

function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: session, update, status } = useSession();

    const [id, setId] = useState(session?.user?.id || "");
    const [name, setName] = useState(session?.user?.name || "");
    const [surname, setSurname] = useState(session?.user?.surname || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [avatar, setAvatar] = useState(session?.user?.avatar || "");
    const [points, setPoints] = useState(session?.user?.points || 0);
    const [isPasswordExist, setIsPasswordExist] = useState(session?.user?.isPasswordExist || false);
    // const [loading, setLoading] = useState(true);
    const loading = status == "loading";

    const [isDataFetched, setIsDataFetched] = useState(false);

    const timerRef = useRef<NodeJS.Timer | null>(null);

    const userData: userData = {
        loading,
        user: {
            id,
            name,
            setName,
            surname,
            setSurname,
            email,
            setEmail,
            points,
            setPoints,
            isPasswordExist,
            setIsPasswordExist,
            avatar,
            setAvatar,
        },
    };

    useEffect(() => {
        if (session?.user?.unauthenticated) signOut();

        setId(session?.user?.id || "");
        setName(session?.user?.name || "");
        setSurname(session?.user?.surname || "");
        setEmail(session?.user?.email || "");
        setPoints(session?.user?.points || 0);
        setAvatar(session?.user?.avatar || "");
        setIsPasswordExist(session?.user?.isPasswordExist || false);
    }, [session]);

    useMemo(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            if (!validateUserData({ name, surname, email }).hasErrors && !isDataFetched) setIsDataFetched(true);

            if (isDataFetched && !validateUserData({ name, surname, email }).hasErrors)
                fetch("/api/change-user-data", { method: "post", body: JSON.stringify({ name, surname, email }) });
        }, 250);
    }, [name, surname, email]);

    return (
        <UserContext.Provider value={status == "unauthenticated" ? { loading: false, user: undefined } : userData}>
            {children}
        </UserContext.Provider>
    );
}

function useUserData() {
    const data: userData = useContext(UserContext);
    return data;
}

export { UserProvider, useUserData };

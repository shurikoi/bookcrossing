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
    const { data: session, status } = useSession();

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");
    const [points, setPoints] = useState(0);
    const [isPasswordExist, setIsPasswordExist] = useState(false);
    const [loading, setLoading] = useState(true);

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

    const userEmail = session?.user.email;

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch("/api/get-user-data", {
                method: "post",
                body: JSON.stringify({ email: userEmail }),
            });

            try {
                const user = await response.json();

                if (user.isPasswordExist) setIsPasswordExist(true);

                setId(user.id);
                setName(user.name);
                setSurname(user.surname);
                setEmail(user.email);
                setPoints(user.points);
                setAvatar(user.avatar);

                setLoading(false);
            } catch (error) {
                signOut();
            }
        }

        if (userEmail) fetchUser();
    }, [userEmail]);

    useMemo(() => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
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

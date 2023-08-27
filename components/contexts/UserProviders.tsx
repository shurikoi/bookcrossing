"use client";

import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext<any>(null);

interface data {
    loading: boolean;
    user?: {
        name: string;
        setName: Dispatch<SetStateAction<string>>;
        surname: string;
        setSurname: Dispatch<SetStateAction<string>>;
        email: string;
        setEmail: Dispatch<SetStateAction<string>>;
        points: number;
        setPoints: Dispatch<SetStateAction<number>>;
        isPasswordExist: boolean;
    };
}

function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [points, setPoints] = useState(0);
    const [isPasswordExist, setIsPasswordExist] = useState(false);

    const [data, setData] = useState<data>({ loading: true });
    const [loading, setLoading] = useState(true);

    const userEmail = session?.user.email;

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch("/api/getUserData", {
                method: "post",
                body: JSON.stringify({ email: userEmail }),
            });

            const user = await response.json();

            if (user.isPasswordExist) setIsPasswordExist(true);

            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
            setPoints(user.points);

            setLoading(false);
        }

        if (userEmail) fetchUser();
    }, [userEmail]);

    useMemo(() => {
        setData({
            loading,
            user: { name, setName, surname, setSurname, email, setEmail, points, setPoints, isPasswordExist },
        });
    }, [name, surname, email, points, loading, isPasswordExist]);

    useMemo(() => {
        if (!loading) fetch("/api/changeUserData", { method: "post", body: JSON.stringify({ name, surname, email }) });
    }, [name, surname, email]);

    return (
        <UserContext.Provider value={status == "unauthenticated" ? { loading: false, user: undefined } : data}>
            {children}
        </UserContext.Provider>
    );
}

function useUserData() {
    const data: data = useContext(UserContext);

    return data;
}

export { UserProvider, useUserData };

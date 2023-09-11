"use client";

import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext<any>(null);

type userData = {
    loading: boolean;
    user?: {
        id: string;
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

    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [points, setPoints] = useState(0);
    const [isPasswordExist, setIsPasswordExist] = useState(false);
    const [loading, setLoading] = useState(true);

    const userData : userData = {
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
        },
    };
    
    // const [data, setData] = useState<data>({ loading: true });

    const userEmail = session?.user.email;

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch("/api/getUserData", {
                method: "post",
                body: JSON.stringify({ email: userEmail }),
            });

            const user = await response.json();

            if (user.isPasswordExist) setIsPasswordExist(true);

            setId(user.id);
            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
            setPoints(user.points);

            setLoading(false);
        }

        if (userEmail) fetchUser();
    }, [userEmail]);

    useMemo(() => {
        if (!loading && userData.user) fetch("/api/changeUserData", { method: "post", body: JSON.stringify({ name, surname, email }) });
    }, [name, surname, email]);
    console.log(status, session)
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

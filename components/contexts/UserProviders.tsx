"use client";

import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useMemo, useState } from "react";

const UserContext = createContext<any>(null);

type userData = {
    loading: boolean;
    user?: {
        id: string | undefined;
        name: string | undefined;
        surname: string | undefined;
        email: string | undefined;
        points: number;
        isPasswordExist: boolean;
        setName: Dispatch<SetStateAction<string | undefined>>;
        setSurname: Dispatch<SetStateAction<string | undefined>>;
        setEmail: Dispatch<SetStateAction<string | undefined>>;
        setPoints: Dispatch<SetStateAction<number>>;
        setIsPasswordExist: Dispatch<SetStateAction<boolean>>;
    };
};

function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    const [id, setId] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string | undefined>(undefined);
    const [surname, setSurname] = useState<string | undefined>(undefined);
    const [email, setEmail] = useState<string | undefined>(undefined);
    const [points, setPoints] = useState(0);
    const [isPasswordExist, setIsPasswordExist] = useState(false);
    const [loading, setLoading] = useState(true);

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
        if (!loading && userData.user && !Object.values(userData.user).includes(undefined)) // if no user and fields are not empty
            fetch("/api/changeUserData", { method: "post", body: JSON.stringify({ name, surname, email }) });
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

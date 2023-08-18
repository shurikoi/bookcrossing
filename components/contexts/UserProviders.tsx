"use client";

import users from "@/model/user";
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
    };
}

function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [points, setPoints] = useState(0);

    const [data, setData] = useState<data>({ loading: true });
    const [loading, setLoading] = useState(true);

    const id = session?.user.id;

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch("/api/getUserData", {
                method: "post",
                body: JSON.stringify({ id }),
            });

            const user = await response.json();

            setName(user.name);
            setSurname(user.surname);
            setEmail(user.email);
            setPoints(user.points);

            setLoading(false);
        }

        if (id) fetchUser();
    }, [id]);

    useMemo(() => {
        setData({
            loading,
            user: { name, setName, surname, setSurname, email, setEmail, points, setPoints },
        });
    }, [name, surname, email, points, loading]);

    useMemo(() => {
        if (name != "" && surname != "" && email != "")
            fetch("/api/changeUserData", { method: "post", body: JSON.stringify({ name, surname, email }) });
    }, [name, surname, email]);

    return (
        <UserContext.Provider value={status == "unauthenticated" ? { loading: false } : data}>
            {children}
        </UserContext.Provider>
    );
}

function useUserData() {
    const data: data = useContext(UserContext);
    return data;
}

export { UserProvider, useUserData };

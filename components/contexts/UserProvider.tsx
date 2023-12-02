"use client";

import { validateLogin } from "@/lib/isUserDataValid";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";

const UserContext = createContext<any>(null);

type userData = {
  user?: {
    id: string;
    name: string;
    surname: string;
    login: string;
    points: number;
    avatar: string;
    setAvatar: Dispatch<SetStateAction<string>>;
    setName: Dispatch<SetStateAction<string>>;
    setSurname: Dispatch<SetStateAction<string>>;
    setLogin: Dispatch<SetStateAction<string>>;
    setPoints: Dispatch<SetStateAction<number>>;
  };
};

function UserProvider({ children }: { children: React.ReactNode; session?: Session }) {
  const { data: session } = useSession();

  const [id, setId] = useState(session?.user?.id || "");
  const [name, setName] = useState(session?.user?.name || "");
  const [surname, setSurname] = useState(session?.user?.surname || "");
  const [login, setLogin] = useState(session?.user?.login || "");
  const [avatar, setAvatar] = useState(session?.user?.avatar || "");
  const [points, setPoints] = useState(session?.user?.points || 0);
  // const [isPasswordExist, setIsPasswordExist] = useState(session?.user?.isPasswordExist || false);
  // const [loading, setLoading] = useState(true);
  //   const loading = status == "loading";

  const [isDataFetched, setIsDataFetched] = useState(false);

  const timerRef = useRef<NodeJS.Timer | null>(null);

  const userData: userData = {
    user: {
      id,
      name,
      setName,
      surname,
      setSurname,
      login,
      setLogin,
      points,
      setPoints,
      avatar,
      setAvatar,
    },
  };

  useLayoutEffect(() => {
    if (session?.user?.unauthenticated) signOut();

    // setId(session?.user?.id || "");
    // setLogin(session?.user?.login || "");
    // setName(session?.user?.name || "");
    // setSurname(session?.user?.surname || "");
    // setPoints(session?.user?.points || 0);
    // setAvatar(session?.user?.avatar || "");
  }, [session]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (validateLogin(login).isValid)
        fetch("/api/change-user-data", { method: "post", body: JSON.stringify({ login }) });
    }, 250);
  }, [login]);

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
}

function useUserData() {
  const data: userData = useContext(UserContext);

  return data;
}

export { UserProvider, useUserData };

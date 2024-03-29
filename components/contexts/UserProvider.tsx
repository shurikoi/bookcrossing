"use client";

import { validateLogin } from "@/lib/isUserDataValid";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
  const { data: session, status } = useSession();

  const [id, setId] = useState(session?.user?.id!);
  const [name, setName] = useState(session?.user?.name!);
  const [surname, setSurname] = useState(session?.user?.surname!);
  const [login, setLogin] = useState(session?.user?.login!);
  const [avatar, setAvatar] = useState(session?.user?.avatar!);
  const [points, setPoints] = useState(session?.user?.points!);

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

  useEffect(() => {
    if (!isDataFetched) {
      setIsDataFetched(true);

      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      if (validateLogin(login).isValid)
        fetch("/api/change-user-data", { method: "POST", body: JSON.stringify({ login }) });
    }, 250);
  }, [login]);

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
}

function useUserData() {
  const data: userData = useContext(UserContext);

  return data;
}

export { UserProvider, useUserData };

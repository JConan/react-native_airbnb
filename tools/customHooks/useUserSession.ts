import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export interface UserSession {
  token: string;
  userId: string;
}

const STORAGE_KEY = "userSession";

export const useUserSession = () => {
  const [userSession, setUserSession] = useState<UserSession>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => value && (JSON.parse(value) as UserSession))
      .then((session) => session && setUserSession(session))
      .then(() => setLoading(false));
  }, []);

  useEffect(() => {
    const update = async () => {
      if (userSession)
        return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userSession));
      else return AsyncStorage.removeItem(STORAGE_KEY);
    };
    setLoading(true);
    update().then(() => setLoading(false));
  }, [userSession]);

  return {
    isLoading,
    userSession,
    setUserSession,
  };
};

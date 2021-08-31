import { useCallback, useEffect, useState } from "react";
import { UserInfo } from "../api/UserSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserState = () => {
  const [userInfo, setUser] = useState<UserInfo | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("userInfo")
      .then((value) => {
        return (value && (JSON.parse(value) as UserInfo)) || undefined;
      })
      .then(setUser)
      .catch((reason) => console.error(reason))
      .then(() => setIsLoading(false));
  }, []);

  return {
    userInfo,
    isLoading,
    store: useCallback((userInfo: UserInfo) => {
      setUser(userInfo);
      return AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    }, []),
    logout: useCallback(() => {
      setUser(undefined);
      return AsyncStorage.removeItem("userInfo");
    }, []),
  };
};

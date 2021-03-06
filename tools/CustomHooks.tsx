import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UserInfo } from "../api/UserSchema";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserSession {
  userInfo: UserInfo | undefined;
  isLoading: boolean;
  store: (userInfo: UserInfo) => Promise<void> | undefined;
  logout: () => Promise<void> | undefined;
}

const UserSessionContext = createContext<UserSession>({
  userInfo: undefined,
  isLoading: true,
  store: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

export const UserSession = ({
  children,
}: {
  children: (userState: UserSession) => React.ReactNode;
}) => {
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

  const store = useCallback((userInfo: UserInfo) => {
    setUser(userInfo);
    return AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
  }, []);
  const logout = useCallback(() => {
    setUser(undefined);
    return AsyncStorage.removeItem("userInfo");
  }, []);

  return (
    <UserSessionContext.Provider
      value={{
        userInfo,
        isLoading,
        store,
        logout,
      }}
    >
      {children({ userInfo, isLoading, store, logout })}
    </UserSessionContext.Provider>
  );
};

export const useUserSession = () => useContext(UserSessionContext);

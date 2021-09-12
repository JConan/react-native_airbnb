import { UserInfo } from "../../api/UserSchema";
import React, { createContext, useEffect, useState } from "react";
import { useUserSession } from "./useUserSession";
import { getUserInfo } from "../../api/User";

interface UserInfoContextProps {
  isLoading: boolean;
  userInfo: UserInfo | undefined;
  setUserInfo: (userInfo: UserInfo) => void;
  logout: () => void;
  storeUserInfo: (userInfo: UserInfo) => void;
}

export const UserInfoContext = createContext<UserInfoContextProps | undefined>(
  undefined
);

export const UserInfoProvider = ({
  children,
}: {
  children: (args: UserInfoContextProps) => React.ReactNode;
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();
  const { isLoading, userSession, setUserSession } = useUserSession();
  const [isRequesting, setRequesting] = useState(false);

  const contextProps: UserInfoContextProps = {
    userInfo,
    isLoading: isLoading || isRequesting,
    setUserInfo,
    logout: () => {
      setUserSession(undefined);
      setUserInfo(undefined);
    },
    storeUserInfo: (userInfo) => {
      setUserInfo(userInfo);
      userInfo.token &&
        setUserSession({ token: userInfo.token, userId: userInfo.id });
    },
  };

  useEffect(() => {
    if (userSession && !userInfo) {
      setRequesting(true);
      const { token, userId } = userSession;
      getUserInfo(token, userId)
        .then((info) => setUserInfo({ ...info, token }))
        .catch((error) => console.error(JSON.stringify(error)))
        .then(() => setRequesting(false));
    }
  }, [userSession]);

  return (
    <UserInfoContext.Provider value={contextProps}>
      {children(contextProps)}
    </UserInfoContext.Provider>
  );
};

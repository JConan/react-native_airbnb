import { useContext } from "react";
import { UserInfoContext } from "./UserInfoProvider";

export const useUserInfo = () => useContext(UserInfoContext);

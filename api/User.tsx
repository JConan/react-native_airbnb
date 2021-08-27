import axios from "axios";
import Constants from "expo-constants";
import { UserInfo, UserSignInForms } from "./UserSchema";

export const login = async (data: UserSignInForms): Promise<UserInfo> => {
  return axios
    .post("/user/log_in", data, {
      baseURL: Constants.manifest?.extra?.backendBasePath,
    })
    .then((response) => response.data);
};

import axios from "axios";
import Constants from "expo-constants";

export interface UserInfo {
  description: string;
  email: string;
  id: string;
  photo: {
    picture_id: string;
    url: string;
  };
  rooms: string[];
  token: string;
  username: string;
}

export const login = (email: string, password: string) =>
  axios
    .post(
      "/user/log_in",
      {
        email,
        password,
      },
      {
        baseURL: Constants.manifest?.extra?.backendBasePath,
      }
    )
    .then((response) => response.data as UserInfo);

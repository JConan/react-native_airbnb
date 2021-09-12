import axios from "axios";
import Constants from "expo-constants";
import { UserInfo, UserSignInForms, UserSignUpForm } from "./UserSchema";
import FormData from "form-data";
import path from "path";

export const login = async (data: UserSignInForms): Promise<UserInfo> => {
  return axios
    .post("/user/log_in", data, {
      baseURL: Constants.manifest?.extra?.backendBasePath,
    })
    .then((response) => response.data);
};

export const signUp = async (data: UserSignUpForm): Promise<UserInfo> => {
  const { confirmPassword, ...formData } = data;
  return axios
    .post("/user/sign_up", formData, {
      baseURL: Constants.manifest?.extra?.backendBasePath,
    })
    .then((response) => response.data);
};

export const update = async (
  token: string,
  data: Pick<UserInfo, "email" | "username" | "description">
): Promise<Omit<UserInfo, "token">> => {
  return axios
    .put(`/user/update`, data, {
      baseURL: Constants.manifest?.extra?.backendBasePath,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const updatePicture = async (token: string, uri: string) => {
  const data = new FormData();
  data.append("photo", {
    uri,
    name: "userPicture",
    type: `image/${path.extname(uri)}`,
  });

  return axios
    .put(`/user/upload_picture`, data, {
      baseURL: Constants.manifest?.extra?.backendBasePath,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
};

export const getUserInfo = (token: string, userId: string) =>
  axios
    .get(`/user/${userId}`, {
      baseURL: Constants.manifest?.extra?.backendBasePath,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data as Omit<UserInfo, "token">);

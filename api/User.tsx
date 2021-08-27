import axios from "axios";
import Constants from "expo-constants";
import {
  UserInfo,
  UserSignInForms,
  UserSignUpForm,
  UserSignUpFormSchema,
} from "./UserSchema";

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

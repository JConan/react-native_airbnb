import axios from "axios";

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
    .post("https://express-airbnb-api.herokuapp.com/user/log_in", {
      email,
      password,
    })
    .then((response) => response.data as UserInfo);

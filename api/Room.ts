import axios from "axios";
import Constants from "expo-constants";
import { Rooms } from "./RoomsSchema";

export const getRooms = async (): Promise<Rooms> => {
  return axios
    .get("/rooms", {
      baseURL: Constants.manifest?.extra?.backendBasePath,
    })
    .then((response) => response.data);
};

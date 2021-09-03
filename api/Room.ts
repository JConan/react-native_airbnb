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

export interface Coords {
  latitude: number;
  longitude: number;
}

export const getRoomsAround = async (coords?: Coords): Promise<Rooms> => {
  return axios
    .get("/rooms/around", {
      baseURL: Constants.manifest?.extra?.backendBasePath,
      params: { ...coords },
    })
    .then((response) => response.data);
};

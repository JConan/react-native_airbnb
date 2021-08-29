import { Room } from "../api/RoomsSchema";

export type DefaultScreenParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

export type HomeScreenStackParamList = {
  HomeScreen: undefined;
  RoomScreen: Room;
};

export type UserTabParamList = {
  HomeTab: undefined;
  AroundMeTab: undefined;
  MyProfilTab: undefined;
};

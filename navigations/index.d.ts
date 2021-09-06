import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Room, RoomId } from "../api/RoomsSchema";

declare global {
  namespace ReactNavigation {
    namespace Home {
      type ScreenParams = {
        RoomListScreen: undefined;
        RoomScreen: RoomId;
      };
      namespace Navigation {
        type RoomListScreen = NativeStackNavigationProp<
          ReactNavigation.Home.ScreenParams,
          "RoomListScreen"
        >;
        type RoomScreen = NativeStackNavigationProp<
          ReactNavigation.Home.ScreenParams,
          "RoomScreen"
        >;
      }
    }

    namespace AroundMe {
      type ScreenParams = {
        RoomsAroundMeScreen: undefined;
        RoomScreen: RoomId;
      };
      namespace Navigation {
        type RoomsAroundMeScreen = NativeStackNavigationProp<
          ReactNavigation.AroundMe.ScreenParams,
          "RoomsAroundMeScreen"
        >;
        type RoomScreen = NativeStackNavigationProp<
          ReactNavigation.AroundMe.ScreenParams,
          "RoomScreen"
        >;
      }
    }

    namespace MyProfile {
      type ScreenParams = {
        ProfileScreen: undefined;
      };
    }
  }
}

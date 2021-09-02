import React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { Room } from "../api/RoomsSchema";
import { RoomsAroundMeScreen } from "../screens/RoomsAroundMeScreen";
import { RoomScreen } from "../screens/RoomScreen";
import { HeaderOptions } from "@react-navigation/elements";

export type ScreenParams = {
  RoomsAroundMeScreen: undefined;
  RoomScreen: Room;
};

const Stack = createNativeStackNavigator<ScreenParams>();

export type AroundMeNavigationKeys = keyof ScreenParams;

export type AroundMeNavigationProps<K extends AroundMeNavigationKeys> = {
  navigation: NativeStackNavigationProp<ScreenParams, K>;
  route: RouteProp<ScreenParams, K>;
};

interface Props {
  screenOptions: Pick<HeaderOptions, "headerTitle" | "headerTitleAlign">;
}

export const AroundMeNavigatorStacks = ({ screenOptions }: Props) => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      headerBackTitle: "",
      ...screenOptions,
    }}
  >
    <Stack.Screen name="RoomsAroundMeScreen">
      {(props) => <RoomsAroundMeScreen {...props} />}
    </Stack.Screen>
    <Stack.Screen name="RoomScreen">
      {(props) => <RoomScreen {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

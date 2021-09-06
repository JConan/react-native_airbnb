import React from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RoomListScreen } from "../screens/RoomListScreen";
import { RoomScreen } from "../screens/RoomScreen";
import { HeaderOptions } from "@react-navigation/elements";

type ScreenParams = ReactNavigation.Home.ScreenParams;

const Stack = createNativeStackNavigator<ScreenParams>();

export const useHomeNavigation = () =>
  useNavigation<NativeStackNavigationProp<ScreenParams, "RoomScreen">>();

export type HomeNavigationProps<K extends keyof ScreenParams> = {
  navigation: NativeStackNavigationProp<ScreenParams, K>;
  route: RouteProp<ScreenParams, K>;
};

interface Props {
  screenOptions: Pick<HeaderOptions, "headerTitle" | "headerTitleAlign">;
}

export const HomeNavigatorStacks = ({ screenOptions }: Props) => (
  <Stack.Navigator
    screenOptions={{
      animation: "slide_from_right",
      headerBackTitle: "",
      ...screenOptions,
    }}
  >
    <Stack.Screen name="RoomListScreen">
      {(props) => <RoomListScreen {...props} />}
    </Stack.Screen>
    <Stack.Screen name="RoomScreen">
      {(props) => <RoomScreen {...props} />}
    </Stack.Screen>
  </Stack.Navigator>
);

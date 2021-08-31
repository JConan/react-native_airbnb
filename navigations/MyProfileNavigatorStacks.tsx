import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";
import { ProfileScreen } from "../screens/ProfileScreen";

type ScreenParams = {
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<ScreenParams>();

interface Props {
  screenOptions: NativeStackNavigationOptions;
}

export const MyProfileNavigatorStacks = ({ screenOptions }: Props) => (
  <Stack.Navigator {...{ screenOptions }}>
    <Stack.Screen name="ProfileScreen">
      {(props) => <ProfileScreen />}
    </Stack.Screen>
  </Stack.Navigator>
);

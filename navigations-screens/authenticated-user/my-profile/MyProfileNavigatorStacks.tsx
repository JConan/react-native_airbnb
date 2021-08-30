import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import React from "react";
import { ProfileScreen, ProfileScreenProp } from "./ProfileScreen";

type ScreenParams = {
  ProfileScreen: undefined;
};

const Stack = createNativeStackNavigator<ScreenParams>();

interface Props {
  screenOptions: NativeStackNavigationOptions;
  profileScreenProp: ProfileScreenProp;
}

export const MyProfileNavigatorStacks = ({
  screenOptions,
  profileScreenProp,
}: Props) => (
  <Stack.Navigator {...{ screenOptions }}>
    <Stack.Screen name="ProfileScreen">
      {(props) => <ProfileScreen {...props} {...profileScreenProp} />}
    </Stack.Screen>
  </Stack.Navigator>
);

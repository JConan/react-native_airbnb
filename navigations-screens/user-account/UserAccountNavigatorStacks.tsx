import React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { UserInfo } from "../../api/UserSchema";
import { SignInScreen } from "./SignInScreen";
import { SignUpScreen } from "./SignUpScreen";

type ScreensParams = {
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<ScreensParams>();

interface Props {
  storeUserInfo: (userInfo: UserInfo) => Promise<void>;
}

export type UserAccountNavigationProps<K extends keyof ScreensParams> = {
  navigation: NativeStackNavigationProp<ScreensParams, K>;
  route: RouteProp<ScreensParams, K>;
};

export const UserAccountNavigatorStacks = ({ storeUserInfo }: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" options={{ headerShown: false }}>
        {(props) => <SignInScreen {...props} storeUserInfo={storeUserInfo} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp" options={{ headerShown: false }}>
        {(props) => <SignUpScreen {...props} storeUserInfo={storeUserInfo} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

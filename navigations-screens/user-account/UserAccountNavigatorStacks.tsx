import React from "react";
import { RouteProp } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignInScreen } from "./SignInScreen";
import { SignUpScreen } from "./SignUpScreen";
import { useUserState } from "../../tools/customHooks";

type ScreensParams = {
  SignUp: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<ScreensParams>();

export type UserAccountNavigationProps<K extends keyof ScreensParams> = {
  navigation: NativeStackNavigationProp<ScreensParams, K>;
  route: RouteProp<ScreensParams, K>;
};

export const UserAccountNavigatorStacks = () => {
  const { isLoading, store: storeUserInfo } = useUserState();

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

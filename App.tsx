import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultScreenParamList, UserScreenParamList } from "./screens/Screens";
import { useState } from "react";
import { UserInfo } from "./api/UserSchema";
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { MyProfilScreen } from "./screens/MyProfilScreen";
import { useEffect } from "react";

const DefaultStack = createNativeStackNavigator<DefaultScreenParamList>();
const UserStack = createNativeStackNavigator<UserScreenParamList>();

export default function App() {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>();

  const storeUserInfo = async (userInfo: UserInfo) => {
    await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
    setUserInfo(userInfo);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userInfo");
    setUserInfo(undefined);
  };

  useEffect(() => {
    AsyncStorage.getItem("userInfo").then(
      (value) => value && setUserInfo(JSON.parse(value))
    );
  }, []);

  return (
    <NavigationContainer>
      {userInfo ? (
        <UserStack.Navigator>
          <UserStack.Screen name="MyProfil">
            {(props) => (
              <MyProfilScreen {...props} user={{ userInfo, logout }} />
            )}
          </UserStack.Screen>
        </UserStack.Navigator>
      ) : (
        <DefaultStack.Navigator>
          <DefaultStack.Screen name="SignIn" options={{ headerShown: false }}>
            {(props) => (
              <SignInScreen {...props} storeUserInfo={storeUserInfo} />
            )}
          </DefaultStack.Screen>
          <DefaultStack.Screen name="SignUp" options={{ headerShown: false }}>
            {(props) => (
              <SignUpScreen {...props} storeUserInfo={storeUserInfo} />
            )}
          </DefaultStack.Screen>
        </DefaultStack.Navigator>
      )}
    </NavigationContainer>
  );
}

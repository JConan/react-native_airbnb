import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DefaultScreenParamList,
  UserScreenParamList,
  UserTabParamList,
} from "./screens/Screens";
import { useState } from "react";
import { UserInfo } from "./api/UserSchema";
import { SignInScreen } from "./screens/SignInScreen";
import { SignUpScreen } from "./screens/SignUpScreen";
import { MyProfilScreen } from "./screens/MyProfilScreen";
import { useEffect } from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { Octicons } from "@expo/vector-icons";
import { getRooms } from "./api/Room";

const DefaultStack = createNativeStackNavigator<DefaultScreenParamList>();
const UserStack = createNativeStackNavigator<UserScreenParamList>();
const UserTab = createBottomTabNavigator<UserTabParamList>();

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
    getRooms()
      .then((rooms) => console.log(JSON.stringify(rooms[0])))
      .catch((err) => console.log(JSON.stringify(err)));
  }, []);

  return (
    <NavigationContainer>
      {userInfo ? (
        <UserTab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          }}
        >
          <UserTab.Screen
            name="Home"
            options={{
              tabBarIcon: ({ color, size }) => (
                <Octicons name="home" size={size} color={color} />
              ),
            }}
          >
            {(props) => <HomeScreen {...props} />}
          </UserTab.Screen>
          <UserTab.Screen
            name="MyProfil"
            options={{
              tabBarLabel: "My Profil",
              tabBarIcon: ({ color, size }) => (
                <Octicons name="person" size={size} color={color} />
              ),
            }}
          >
            {(props) => (
              <MyProfilScreen {...props} user={{ userInfo, logout }} />
            )}
          </UserTab.Screen>
        </UserTab.Navigator>
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

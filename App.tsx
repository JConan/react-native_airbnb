import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTabParamList } from "./navigations-screens/Screens";
import { useState } from "react";
import { UserInfo } from "./api/UserSchema";
import { useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { UserAccountNavigatorStacks } from "./navigations-screens/user-account/UserAccountNavigatorStacks";
import { HomeNavigatorStacks } from "./navigations-screens/authenticated-user/home/HomeNavigatorStacks";
import { MyProfileNavigatorStacks } from "./navigations-screens/authenticated-user/my-profile/MyProfileNavigatorStacks";

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
  }, []);

  const stackNavigationScreenOptions: NativeStackNavigationOptions = {
    headerTitle: () => (
      <View style={{ width: 30, height: 30 }}>
        <Image
          style={{
            flex: 1,
            alignSelf: "center",
            resizeMode: "contain",
          }}
          source={require("./assets/icon.png")}
        />
      </View>
    ),
    headerTitleAlign: "center",
    headerBackTitle: "",
    animation: "slide_from_right",
  };

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
            name="HomeTab"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color, size }) => (
                <Octicons name="home" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <HomeNavigatorStacks
                screenOptions={{ ...stackNavigationScreenOptions }}
              />
            )}
          </UserTab.Screen>
          <UserTab.Screen
            name="MyProfilTab"
            options={{
              tabBarLabel: "My Profil",
              tabBarIcon: ({ color, size }) => (
                <Octicons name="person" size={size} color={color} />
              ),
            }}
          >
            {() => (
              <MyProfileNavigatorStacks
                screenOptions={{ ...stackNavigationScreenOptions }}
                profileScreenProp={{ user: { userInfo, logout } }}
              />
            )}
          </UserTab.Screen>
        </UserTab.Navigator>
      ) : (
        <UserAccountNavigatorStacks storeUserInfo={storeUserInfo} />
      )}
    </NavigationContainer>
  );
}

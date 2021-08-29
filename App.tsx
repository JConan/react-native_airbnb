import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DefaultScreenParamList,
  HomeScreenStackParamList,
  ProfileScreenStackParamList,
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
import { RoomScreen } from "./screens/RoomScreen";
import { Image, View } from "react-native";

const DefaultStack = createNativeStackNavigator<DefaultScreenParamList>();
const HomeStack = createNativeStackNavigator<HomeScreenStackParamList>();
const ProfilStack = createNativeStackNavigator<ProfileScreenStackParamList>();
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
              <HomeStack.Navigator screenOptions={stackNavigationScreenOptions}>
                <HomeStack.Screen name="HomeScreen">
                  {(props) => <HomeScreen {...props} />}
                </HomeStack.Screen>
                <HomeStack.Screen name="RoomScreen">
                  {(props) => <RoomScreen {...props} />}
                </HomeStack.Screen>
              </HomeStack.Navigator>
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
              <ProfilStack.Navigator
                screenOptions={stackNavigationScreenOptions}
              >
                <ProfilStack.Screen name="MyProfile">
                  {(props) => (
                    <MyProfilScreen {...props} user={{ userInfo, logout }} />
                  )}
                </ProfilStack.Screen>
              </ProfilStack.Navigator>
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

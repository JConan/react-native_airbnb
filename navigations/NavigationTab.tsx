import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderOptions } from "@react-navigation/elements";
import { Octicons } from "@expo/vector-icons";
import { Image, View } from "react-native";
import { ProfileScreen } from "../screens/ProfileScreen";
import { HomeNavigatorStacks } from "./HomeNavigatorStacks";

export type TabParams = {
  HomeTab: undefined;
  AroundMeTab: undefined;
  MyProfileTab: undefined;
};

const Tab = createBottomTabNavigator<TabParams>();

const headerOptions: Pick<HeaderOptions, "headerTitle" | "headerTitleAlign"> = {
  headerTitle: () => (
    <View style={{ width: 30, height: 30 }}>
      <Image
        style={{
          flex: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../assets/icon.png")}
      />
    </View>
  ),
  headerTitleAlign: "center",
};

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        ...headerOptions,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, ...iconProps }) => (
            <Octicons name="home" {...iconProps} />
          ),
        }}
      >
        {() => <HomeNavigatorStacks screenOptions={{ ...headerOptions }} />}
      </Tab.Screen>
      <Tab.Screen
        name="AroundMeTab"
        options={{
          title: "Around me",
          tabBarIcon: ({ focused, ...iconProps }) => (
            <Octicons name="broadcast" {...iconProps} />
          ),
        }}
      >
        {() => <></>}
      </Tab.Screen>
      <Tab.Screen
        name="MyProfileTab"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, ...iconProps }) => (
            <Octicons name="person" {...iconProps} />
          ),
        }}
      >
        {() => <ProfileScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

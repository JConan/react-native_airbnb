import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./navigations/NavigationTab";
import { UserSession } from "./tools/customHooks";
import { UserAccountNavigatorStacks } from "./navigations/UserAccountNavigatorStacks";
import { LottieAnimation } from "./components/LottieAnimation";

export default function App() {
  return (
    <UserSession>
      {({ userInfo, isLoading }) => (
        <NavigationContainer>
          {isLoading ? (
            <LottieAnimation animation="dot" />
          ) : userInfo ? (
            <TabNavigator />
          ) : (
            <UserAccountNavigatorStacks />
          )}
        </NavigationContainer>
      )}
    </UserSession>
  );
}

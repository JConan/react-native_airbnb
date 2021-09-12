import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./navigations/NavigationTab";
// import { UserSession } from "./tools/CustomHooks";
import { UserAccountNavigatorStacks } from "./navigations/UserAccountNavigatorStacks";
import { LottieAnimation } from "./components/LottieAnimation";
import { UserInfoProvider } from "./tools/customHooks/UserInfoProvider";

export default function App() {
  return (
    <UserInfoProvider>
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
    </UserInfoProvider>
  );
}

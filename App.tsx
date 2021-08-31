import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { TabNavigator } from "./navigations/NavigationTab";
import { UserStateProvider } from "./tools/customHooks";
import { UserAccountNavigatorStacks } from "./navigations/UserAccountNavigatorStacks";
import { Loader } from "./components/Loader";

export default function App() {
  return (
    <UserStateProvider>
      {({ userInfo, isLoading }) => (
        <NavigationContainer>
          {isLoading ? (
            <Loader animation="dot" />
          ) : userInfo ? (
            <TabNavigator />
          ) : (
            <UserAccountNavigatorStacks />
          )}
        </NavigationContainer>
      )}
    </UserStateProvider>
  );
}

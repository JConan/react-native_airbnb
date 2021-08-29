import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text } from "react-native";
import { UserInfo } from "../api/UserSchema";
import { AirbnbBaseView } from "../components/AirbnbBaseView";
import { UserScreenParamList } from "./Screens";

interface MyProfilScreenProp {
  navigation: NativeStackNavigationProp<UserScreenParamList, "MyProfil">;
  route: RouteProp<UserScreenParamList, "MyProfil">;
  user: { userInfo: UserInfo; logout: () => Promise<void> };
}

export const MyProfilScreen = ({
  user: { userInfo, logout },
}: MyProfilScreenProp) => {
  return (
    <AirbnbBaseView>
      <Text>{JSON.stringify(userInfo)}</Text>
      <Button title="logout" onPress={logout} />
    </AirbnbBaseView>
  );
};

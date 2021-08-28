import { RouteProp } from "@react-navigation/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text } from "react-native";
import { UserInfo } from "../api/UserSchema";
import { AirbnbSignView } from "../components/AirbnbSignView";
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
    <AirbnbSignView>
      <Text>{JSON.stringify(userInfo)}</Text>
      <Button title="logout" onPress={logout} />
    </AirbnbSignView>
  );
};

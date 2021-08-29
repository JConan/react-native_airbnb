import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { Text } from "react-native";
import { AirbnbBaseView } from "../components/AirbnbBaseView";
import { UserScreenParamList } from "./Screens";

interface HomeScreenProp {
  navigation: NativeStackNavigationProp<UserScreenParamList, "Home">;
  route: RouteProp<UserScreenParamList, "Home">;
}

export const HomeScreen = ({}: HomeScreenProp) => (
  <AirbnbBaseView>
    <Text>Home</Text>
  </AirbnbBaseView>
);

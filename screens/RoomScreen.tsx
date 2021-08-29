import React from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeScreenStackParamList } from "./Screens";
import { RouteProp } from "@react-navigation/native";
import { AirbnbBaseView } from "../components/AirbnbBaseView";
import { RoomCard } from "../components/rooms/RoomCard";
import { BaseView } from "../components/BaseView";

interface RoomScreenProp {
  navigation: NativeStackNavigationProp<HomeScreenStackParamList, "RoomScreen">;
  route: RouteProp<HomeScreenStackParamList, "RoomScreen">;
}

export const RoomScreen = ({
  navigation,
  route: { params: room },
}: RoomScreenProp) => {
  return (
    <BaseView showLogo={true}>
      <ScrollView>
        <RoomCard {...room} fullContent={true} />
        <Button title="back" onPress={() => navigation.goBack()} />
      </ScrollView>
    </BaseView>
  );
};

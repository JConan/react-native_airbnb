import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FlatList, Text } from "react-native";
import { getRooms } from "../api/Room";
import { Rooms } from "../api/RoomsSchema";
import { AirbnbBaseView } from "../components/AirbnbBaseView";
import { RoomCard } from "../components/rooms/RoomCard";
import { HomeScreenStackParamList } from "./Screens";

interface HomeScreenProp {
  navigation: NativeStackNavigationProp<HomeScreenStackParamList, "HomeScreen">;
  route: RouteProp<HomeScreenStackParamList, "HomeScreen">;
}

export const HomeScreen = ({}: HomeScreenProp) => {
  const [rooms, setRooms] = useState<Rooms>([]);

  useEffect(() => {
    getRooms().then((_rooms) => setRooms(_rooms));
  }, []);

  return (
    <AirbnbBaseView>
      <FlatList
        data={rooms}
        renderItem={({ item: room }) => <RoomCard {...room} />}
        keyExtractor={(item) => item._id}
        style={{ borderTopColor: "gray", borderTopWidth: 1, marginTop: 2 }}
      />
    </AirbnbBaseView>
  );
};

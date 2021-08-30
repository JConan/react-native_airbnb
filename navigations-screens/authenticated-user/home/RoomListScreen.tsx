import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FlatList } from "react-native";
import { getRooms } from "../../../api/Room";
import { Rooms } from "../../../api/RoomsSchema";
import { BaseView } from "../../../components/BaseView";
import { RoomCard } from "../../../components/rooms/RoomCard";
import { HomeNavigationProps } from "./HomeNavigatorStacks";

interface Props extends HomeNavigationProps<"RoomListScreen"> {}

export const RoomListScreen = ({}: Props) => {
  const [rooms, setRooms] = useState<Rooms>([]);

  useEffect(() => {
    getRooms().then((_rooms) => setRooms(_rooms));
  }, []);

  return (
    <BaseView removeSafeArea>
      <FlatList
        data={rooms}
        renderItem={({ item: room }) => <RoomCard {...room} />}
        keyExtractor={(item) => item._id}
      />
    </BaseView>
  );
};

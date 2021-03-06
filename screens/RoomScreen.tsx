import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RoomCard } from "../components/rooms/RoomCard";
import { BaseView } from "../components/BaseView";
import MapView, { Marker } from "react-native-maps";
import { EvilIcons } from "@expo/vector-icons";
import { Room, RoomId } from "../api/RoomsSchema";
import { getRoom } from "../api/Room";
import { RouteProp } from "@react-navigation/core";

interface Props {
  route: RouteProp<{ RoomScreen: RoomId }, "RoomScreen">;
}

export const RoomScreen = ({
  route: {
    params: { _id },
  },
}: Props) => {
  const [isFullDescription, setFullDescription] = useState(false);
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    getRoom(_id).then((room) => setRoom(room));
  }, []);

  return (
    <BaseView removeSafeArea>
      {room && (
        <ScrollView bounces={false}>
          <RoomCard {...room} fullContent={true} />
          <View style={{ marginHorizontal: 16 }}>
            <View
              style={{
                alignItems: "center",
                borderColor: "#e6e6e6",
                borderBottomWidth: 1,
                borderTopWidth: 1,
                position: "relative",
              }}
            >
              <Text
                style={{ paddingTop: 10, paddingBottom: 28 }}
                numberOfLines={isFullDescription ? undefined : 3}
                onPress={() => setFullDescription(!isFullDescription)}
              >
                {room.description}
              </Text>
              <EvilIcons
                name={isFullDescription ? "arrow-up" : "arrow-down"}
                size={24}
                color="#a8a8a8"
                style={{
                  position: "absolute",
                  bottom: 0,
                  marginVertical: 5,
                }}
              />
            </View>
            <View style={{ height: 250, marginTop: 50, marginBottom: 100 }}>
              <MapView
                style={{ flex: 1 }}
                initialRegion={{
                  longitude: room.location[0],
                  latitude: room.location[1],
                  latitudeDelta: 0.08,
                  longitudeDelta: 0.08,
                }}
                showsUserLocation={true}
                provider={"google"}
              >
                <Marker
                  title={room.user.account.userName}
                  coordinate={{
                    longitude: room.location[0],
                    latitude: room.location[1],
                  }}
                ></Marker>
              </MapView>
            </View>
          </View>
        </ScrollView>
      )}
    </BaseView>
  );
};

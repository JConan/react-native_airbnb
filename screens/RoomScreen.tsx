import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeScreenStackParamList } from "./Screens";
import { RouteProp } from "@react-navigation/native";
import { RoomCard } from "../components/rooms/RoomCard";
import { BaseView } from "../components/BaseView";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

interface RoomScreenProp {
  navigation: NativeStackNavigationProp<HomeScreenStackParamList, "RoomScreen">;
  route: RouteProp<HomeScreenStackParamList, "RoomScreen">;
}

export const RoomScreen = ({
  navigation,
  route: { params: room },
}: RoomScreenProp) => {
  const [isFullDescription, setFullDescription] = useState(false);

  return (
    <BaseView removeSafeArea>
      <ScrollView>
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
          <View style={{ height: 200, marginTop: 50, marginBottom: 100 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                longitude: room.location[0],
                latitude: room.location[1],
                latitudeDelta: 0.08,
                longitudeDelta: 0.08,
              }}
              showsUserLocation={true}
            >
              <Marker
                coordinate={{
                  longitude: room.location[0],
                  latitude: room.location[1],
                }}
              >
                <FontAwesome name="map-marker" size={24} color="red" />
              </Marker>
            </MapView>
          </View>
        </View>
      </ScrollView>
    </BaseView>
  );
};

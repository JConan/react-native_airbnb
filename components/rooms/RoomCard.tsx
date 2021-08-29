import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { Room } from "../../api/RoomsSchema";
import { Rating } from "./Rating";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "../../screens/Screens";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";

export const RoomCard = (room: Room & { fullContent?: boolean }) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeScreenStackParamList, "RoomScreen">
    >();

  const [isFullDescription, setFullDescription] = useState(false);

  console.log(room.location);
  return (
    <>
      <Pressable onPress={() => navigation.navigate("RoomScreen", room)}>
        <View style={styles.imageContainer}>
          <Image style={{ flex: 1 }} source={{ uri: room.photos![0].url }} />
          <Text style={styles.priceText}>{`${room.price} €`}</Text>
        </View>
        <View
          style={{
            ...styles.descriptionContainer,
            borderBottomWidth: room.fullContent ? 0 : 1,
          }}
        >
          <View
            style={{ flex: 1, paddingTop: 15, justifyContent: "space-around" }}
          >
            <Text numberOfLines={1} style={{ fontSize: 17 }}>
              {room.title}
            </Text>
            <Rating rate={room.ratingValue} reviews={room.reviews} />
          </View>
          <View
            style={{
              position: "absolute",
              right: 0,
              width: 100,
              height: 100,
              borderRadius: 50,
              overflow: "hidden",
            }}
          >
            <Image
              style={{ flex: 1 }}
              source={{ uri: room.user.account.photo.url }}
            />
          </View>
        </View>
      </Pressable>
      {room.fullContent && (
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            numberOfLines={isFullDescription ? undefined : 3}
            onPress={() => setFullDescription(!isFullDescription)}
          >
            {room.description}
          </Text>
          <View></View>
          <View style={{ height: 200 }}>
            <MapView
              // La MapView doit obligatoirement avoir des dimensions
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: { padding: 16, height: 220, position: "relative" },
  priceText: {
    width: 90,
    padding: 20,
    backgroundColor: "black",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    position: "absolute",
    left: 16,
    bottom: 16,
  },
  descriptionContainer: {
    margin: 16,
    marginBottom: 25,
    paddingRight: 105,
    paddingBottom: 20,
    borderBottomColor: "gray",
    height: 115,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

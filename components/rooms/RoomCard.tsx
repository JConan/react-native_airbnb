import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { Room } from "../../api/RoomsSchema";
import { Rating } from "./Rating";
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { HomeScreenStackParamList } from "../../navigations-screens/Screens";

export const RoomCard = (room: Room & { fullContent?: boolean }) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<HomeScreenStackParamList, "RoomScreen">
    >();

  return (
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
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    padding: 16,
    height: 220,
    position: "relative",
  },
  priceText: {
    width: 90,
    padding: 10,
    backgroundColor: "black",
    color: "white",
    fontSize: 18,
    textAlign: "center",
    position: "absolute",
    left: 16,
    bottom: 26,
  },
  descriptionContainer: {
    margin: 10,
    paddingRight: 105,
    paddingBottom: 20,
    borderBottomColor: "gray",
    height: 115,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

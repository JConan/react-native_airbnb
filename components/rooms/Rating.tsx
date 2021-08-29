import React from "react";
import { Text, View } from "react-native";
import { Octicons } from "@expo/vector-icons";

interface RatingProp {
  rate: number;
  reviews: number;
}

export const Rating = ({ rate, reviews }: RatingProp) => {
  const Star = (color: string) => (
    <Octicons name="star" size={24} color={color} />
  );

  const starColor = Array.from({ length: 5 }, (_, i) =>
    i < rate ? "gold" : "gray"
  );

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {starColor.map((color, index) => (
        <Octicons name="star" size={24} color={color} key={index} />
      ))}
      <Text
        style={{ color: "grey", fontSize: 17, marginLeft: 10 }}
      >{`${reviews} reviews`}</Text>
    </View>
  );
};

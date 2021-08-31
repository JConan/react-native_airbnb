import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

interface Props {
  animation: "home" | "dot";
}

export const Loader = ({ animation }: Props) => {
  const data = {
    home: {
      style: { transform: [{ scale: 0.5 }] },
      source: require("../assets/lottie-animation/Home location.json"),
    },
    dot: {
      style: {},
      source: require("../assets/lottie-animation/Bouncing Circles Loader.json"),
    },
  };
  const selectedAnimation = data[animation] || data.dot;

  return (
    <View style={{ flex: 1 }}>
      <LottieView autoPlay loop {...selectedAnimation} />
    </View>
  );
};

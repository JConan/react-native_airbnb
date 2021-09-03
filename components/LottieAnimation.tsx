import React from "react";
import LottieView from "lottie-react-native";
import { View } from "react-native";

interface Props {
  animation: "home" | "dot" | "compass" | "position";
}

export const LottieAnimation = ({ animation }: Props) => {
  const data = {
    home: {
      style: { transform: [{ scale: 0.5 }] },
      source: require("../assets/lottie-animation/Home location.json"),
    },
    compass: {
      style: { transform: [{ scale: 0.5 }] },
      source: require("../assets/lottie-animation/Compass.json"),
    },
    position: {
      style: {},
      source: require("../assets/lottie-animation/Position.json"),
    },
    dot: {
      style: {},
      source: require("../assets/lottie-animation/Bouncing Circles Loader.json"),
    },
  };
  const selectedAnimation = data[animation] || data.dot;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <LottieView
        renderMode={animation === "position" ? "SOFTWARE" : "AUTOMATIC"}
        autoPlay
        loop
        {...selectedAnimation}
      />
    </View>
  );
};

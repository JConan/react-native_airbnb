import React from "react";
import Constants from "expo-constants";
import {
  Image,
  View,
  Dimensions,
  PressableStateCallbackType,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const windows = Dimensions.get("window");

interface AirbnbSignViewProp {
  children?: React.ReactNode;
}

export const AirbnbSignView = ({ children }: AirbnbSignViewProp) => (
  <KeyboardAwareScrollView style={{ backgroundColor: "white" }}>
    <View
      style={{
        backgroundColor: "#fff",
        padding: 16,
        paddingTop: Constants.statusBarHeight + 60,
      }}
    >
      <Image
        style={{
          width: 130,
          height: 100,
          alignSelf: "center",
        }}
        resizeMode="contain"
        source={require("../assets/icon.png")}
      />
      {children}
    </View>
  </KeyboardAwareScrollView>
);

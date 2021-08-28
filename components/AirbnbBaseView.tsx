import React from "react";
import Constants from "expo-constants";
import { Image, View, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const windows = Dimensions.get("window");

interface AirbnbSignViewProp {
  children?: React.ReactNode;
  smallLogo?: boolean;
}

export const AirbnbBaseView = ({ children, smallLogo }: AirbnbSignViewProp) => (
  <View style={{ backgroundColor: "#fff", flex: 1 }}>
    <SafeAreaView />
    <KeyboardAwareScrollView
      style={{
        paddingHorizontal: 16,
      }}
    >
      <Image
        style={{
          marginTop: smallLogo ? 0 : 60,
          width: smallLogo ? 39 : 130,
          height: smallLogo ? 30 : 100,
          alignSelf: "center",
        }}
        resizeMode="contain"
        source={require("../assets/icon.png")}
      />
      {children}
    </KeyboardAwareScrollView>
  </View>
);

import React from "react";
import Constants from "expo-constants";
import { Image, View, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const windows = Dimensions.get("window");

interface AirbnbSignViewProp {
  children?: React.ReactNode;
  bigHeader?: boolean;
}

export const AirbnbBaseView = ({ children, bigHeader }: AirbnbSignViewProp) => (
  <View style={{ backgroundColor: "#fff", flex: 1 }}>
    <SafeAreaView />
    <KeyboardAwareScrollView
      style={{
        paddingHorizontal: 16,
      }}
    >
      <Image
        style={{
          marginTop: bigHeader ? 60 : 0,
          width: bigHeader ? 130 : 30,
          height: bigHeader ? 100 : 30,
          alignSelf: "center",
        }}
        resizeMode="contain"
        source={require("../assets/icon.png")}
      />
      {children}
    </KeyboardAwareScrollView>
  </View>
);
import React from "react";
import Constants from "expo-constants";
import { Image, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface AirbnbSignViewProp {
  children?: React.ReactNode;
  bigHeader?: boolean;
}

export const AirbnbBaseView = ({ children, bigHeader }: AirbnbSignViewProp) => (
  <View style={{ backgroundColor: "#fff", flex: 1 }}>
    <SafeAreaView />
    <KeyboardAwareScrollView>
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

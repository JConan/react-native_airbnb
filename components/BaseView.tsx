import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BaseViewProp {
  showLogo?: boolean;
  children?: React.ReactNode;
}

export const BaseView = ({ showLogo, children }: BaseViewProp) => (
  <View style={{ backgroundColor: "#fff", flex: 1 }}>
    <SafeAreaView />
    {showLogo && (
      <View style={{ borderColor: "grey", borderBottomWidth: 1 }}>
        <Image
          style={{
            width: 30,
            height: 30,
            alignSelf: "center",
          }}
          resizeMode="contain"
          source={require("../assets/icon.png")}
        />
      </View>
    )}
    {children}
  </View>
);

import React from "react";
import { HeaderOptions } from "@react-navigation/elements";
import { Image, View } from "react-native";

export const headerOptions: Pick<
  HeaderOptions,
  "headerTitle" | "headerTitleAlign"
> = {
  headerTitleAlign: "center",
  headerTitle: () => (
    <View style={{ width: 30, height: 30 }}>
      <Image
        style={{
          flex: 1,
          alignSelf: "center",
          resizeMode: "contain",
        }}
        source={require("../assets/icon.png")}
      />
    </View>
  ),
};

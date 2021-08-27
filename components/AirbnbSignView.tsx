import React from "react";
import Constants from "expo-constants";
import {
  Image,
  View,
  Dimensions,
  PressableStateCallbackType,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

const windows = Dimensions.get("window");

interface AirbnbSignViewProp {
  children?: React.ReactNode;
}

export const AirbnbSignView = ({ children }: AirbnbSignViewProp) => (
  <View
    style={{
      backgroundColor: "#fff",
      flex: 1,
    }}
  >
    <SafeAreaView>
      <KeyboardAwareScrollView
        style={{
          paddingHorizontal: 16,
        }}
      >
        <Image
          style={{
            marginTop: 60,
            width: 130,
            height: 100,
            alignSelf: "center",
          }}
          resizeMode="contain"
          source={require("../assets/icon.png")}
        />
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  </View>
);

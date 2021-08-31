import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BaseViewProp {
  removeSafeArea?: boolean;
  children?: React.ReactNode;
}

export const BaseView = ({ removeSafeArea, children }: BaseViewProp) => (
  <View style={{ backgroundColor: "#fff", flex: 1 }}>
    {!removeSafeArea && <SafeAreaView />}
    {children}
  </View>
);

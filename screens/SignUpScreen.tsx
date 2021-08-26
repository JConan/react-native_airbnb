import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { View, Text, Button, Pressable } from "react-native";
import { ScreenParamList } from "./Screens";

interface signUpScreenProp {
  navigation: NativeStackNavigationProp<ScreenParamList, "SignUp">;
  route: RouteProp<ScreenParamList, "SignUp">;
}

export const SignUpScreen = ({ navigation, route }: signUpScreenProp) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable onPress={() => navigation.navigate("SignIn")}>
        <Text style={{ marginTop: 8, textAlign: "center", color: "grey" }}>
          Already have an account? Sign in
        </Text>
      </Pressable>
    </View>
  );
};

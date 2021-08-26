import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput as RNTextInput,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as EmailValidator from "email-validator";
import { login } from "../api/Users";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "./Screens";
import { RouteProp } from "@react-navigation/native";
import { TextInput } from "../components/forms/TextInput";

const windows = Dimensions.get("window");

interface SignInScreenProp {
  navigation: NativeStackNavigationProp<ScreenParamList, "SignIn">;
  route: RouteProp<ScreenParamList, "SignIn">;
}

export const SignInScreen = ({ navigation }: SignInScreenProp) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async () => {
    if (email.trim() === "" || password.trim() === "") {
      setErrorMessage("Please fill all fields");
      return;
    }
    if (!EmailValidator.validate(email)) {
      setErrorMessage("Please provide a valid email");
      return;
    }
    try {
      const userInfo = await login(email, password);
      console.log(userInfo);
      setErrorMessage(`Hello ${userInfo.username}`);
    } catch (response) {
      setErrorMessage("Invalid username/password");
      console.log(response);
      console.log(Constants.manifest?.extra);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-around",
            height: windows.height - Constants.statusBarHeight - 100,
          }}
        >
          <View>
            <Image
              style={{
                width: 130,
                height: 100,
                alignSelf: "center",
              }}
              resizeMode="contain"
              source={require("../assets/icon.png")}
            />
            <Text
              style={{
                marginTop: 32,
                textAlign: "center",
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              Sign in
            </Text>
          </View>
          <View style={{ height: 100 }}>
            <TextInput
              placeholder="email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              placeholder="password"
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <View>
            <Text style={{ textAlign: "center", color: "red" }}>
              {errorMessage}
            </Text>
            <TouchableOpacity onPress={signIn}>
              <View
                style={{
                  marginTop: 15,
                  width: 200,
                  height: 60,
                  borderColor: "red",
                  borderWidth: 1,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                <Text style={{ fontSize: 18 }}>Sign in</Text>
              </View>
            </TouchableOpacity>
            <Pressable onPress={() => navigation.navigate("SignUp")}>
              <Text
                style={{ marginTop: 8, textAlign: "center", color: "grey" }}
              >
                No account ? Register
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    paddingTop: Constants.statusBarHeight + 60,
  },
});

import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Constants from "expo-constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as EmailValidator from "email-validator";
import axios from "axios";
import { login } from "./api/Users";

const windows = Dimensions.get("window");

const data = {
  description: "Courageous adventurer !",
  email: "nono@airbnb-api.com",
  id: "58ff73cc1765a998979a3390",
  photo: {
    picture_id: "a142a09aa",
    url: "https://res.cloudinary.com/lereacteur-apollo/image/upload/v1605177745/apollo/lereacteur/React%20Native/Exercice%20Airbnb/nono_rk9p89.png",
  },
  rooms: ["58ff73d11765a998979a3396"],
  token: "r9GVadnOLBJxySHvgobNj0estURjI5xKHIHVRtPkmwxqOuC56WGiIvdKACrpzDV1",
  username: "Nono",
};

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

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
              source={require("./assets/icon.png")}
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
            <View
              style={{
                paddingBottom: 8,
                borderBottomColor: "red",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                autoCapitalize="none"
                placeholder="email"
                style={{
                  fontSize: 18,
                }}
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View
              style={{
                marginTop: 20,
                paddingBottom: 8,
                borderBottomColor: "red",
                borderBottomWidth: 1,
              }}
            >
              <TextInput
                placeholder="password"
                secureTextEntry={true}
                style={{ fontSize: 18 }}
                onChangeText={(text) => setPassword(text)}
                value={password}
              />
            </View>
          </View>
          <View style={{}}>
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
            <Pressable onPress={() => console.log("go register")}>
              <Text
                style={{ marginTop: 8, textAlign: "center", color: "grey" }}
              >
                No account ? Register
              </Text>
            </Pressable>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 32,
    paddingTop: Constants.statusBarHeight + 60,
  },
});

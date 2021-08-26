import React, { useState } from "react";
import Constants from "expo-constants";
import * as EmailValidator from "email-validator";
import { login } from "../api/Users";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "./Screens";
import { RouteProp } from "@react-navigation/native";
import { TextInput } from "../components/forms/TextInput";
import { Form } from "../components/forms/Form";
import { AirbnbSignView } from "../components/AirbnbSignView";

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
    <AirbnbSignView>
      <Form
        errorMessage={errorMessage}
        title="Sign in"
        validationButtonName="Sign in"
        linkButtonName="No account? Register"
        onValidationButtonPress={signIn}
        onLinkButtonPress={() => navigation.navigate("SignUp")}
      >
        <TextInput placeholder="email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </Form>
    </AirbnbSignView>
  );
};

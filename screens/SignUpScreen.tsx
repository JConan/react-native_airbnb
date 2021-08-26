import React from "react";
import { StyleSheet, TextInput as RNTextInput } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AirbnbSignView } from "../components/AirbnbSignView";
import { Form } from "../components/forms/Form";
import { TextInput } from "../components/forms/TextInput";
import { ScreenParamList } from "./Screens";
import { useState } from "react";

interface signUpScreenProp {
  navigation: NativeStackNavigationProp<ScreenParamList, "SignUp">;
  route: RouteProp<ScreenParamList, "SignUp">;
}

export const SignUpScreen = ({ navigation, route }: signUpScreenProp) => {
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");

  const validate = () => {
    setErrorMessage("Passwords must be the same");
  };

  return (
    <AirbnbSignView>
      <Form
        errorMessage={errorMessage}
        title="Sign Up"
        validationButtonName="Sign Up"
        linkButtonName="Already have an account ? Sign In"
        onLinkButtonPress={() => navigation.navigate("SignIn")}
        onValidationButtonPress={validate}
      >
        <TextInput placeholder="email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          placeholder="describe yourself in a few words..."
          withViewStyle={styles.textArea}
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="confirm password"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </Form>
    </AirbnbSignView>
  );
};

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: "red",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 10,
    height: 100,
  },
});

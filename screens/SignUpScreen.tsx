import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AirbnbSignView } from "../components/AirbnbSignView";
import { Form } from "../components/forms/Form";
import { ScreenParamList } from "./Screens";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledTextInput } from "../components/forms/ControlledTextInput";
import { UserSignUpForm, UserSignUpFormSchema } from "../api/UserSchema";
import { signUp } from "../api/User";

interface signUpScreenProp {
  navigation: NativeStackNavigationProp<ScreenParamList, "SignUp">;
  route: RouteProp<ScreenParamList, "SignUp">;
}

export const SignUpScreen = ({ navigation }: signUpScreenProp) => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSignUpFormSchema),
  });

  useEffect(() => {
    const fieldsInError = Object.keys(errors).sort().join(" ");
    switch (fieldsInError) {
      case "":
        setErrorMessage("");
        break;
      case "email":
        setErrorMessage(errors.email.message);
        break;
      case "confirmPassword":
        setErrorMessage(errors.confirmPassword.message);
        break;
      default:
        setErrorMessage("Please fill all fields");
    }
  }, [errors]);

  const onSignUp = (formData: UserSignUpForm) => {
    return signUp(formData)
      .then((userInfo) => {
        setErrorMessage(`Bienvenue ${userInfo.username}`);
        alert(JSON.stringify(userInfo));
      })
      .catch((error: Error) => {
        if (error.message.match("400"))
          setErrorMessage("email or username already used");
        else setErrorMessage(error.message);
        console.log(error);
      });
  };

  return (
    <AirbnbSignView>
      <Form
        errorMessage={errorMessage}
        title="Sign Up"
        validationButtonName="Sign Up"
        validationButtonDisabled={isSubmitting}
        linkButtonName="Already have an account ? Sign In"
        onLinkButtonPress={() => navigation.navigate("SignIn")}
        onValidationButtonPress={handleSubmit(onSignUp)}
      >
        <ControlledTextInput control={control} name="email" />
        <ControlledTextInput control={control} name="username" />
        <ControlledTextInput
          control={control}
          name="description"
          placeholder="describe yourself in a few words..."
          multiline={true}
          numberOfLines={4}
          containerStyle={styles.textAreaView}
        />
        <ControlledTextInput
          control={control}
          name="password"
          secureTextEntry={true}
        />
        <ControlledTextInput
          control={control}
          name="confirmPassword"
          secureTextEntry={true}
        />
      </Form>
    </AirbnbSignView>
  );
};

const styles = StyleSheet.create({
  textAreaView: {
    borderWidth: 1,
    borderColor: "red",
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 110,
    alignItems: "flex-start",
  },
});

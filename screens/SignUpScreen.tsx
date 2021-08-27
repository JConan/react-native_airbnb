import React, { useEffect } from "react";
import { StyleSheet, TextInput as RNTextInput } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AirbnbSignView } from "../components/AirbnbSignView";
import { Form } from "../components/forms/Form";
import { ScreenParamList } from "./Screens";
import { useState } from "react";
import {
  useForm,
  Controller,
  Control,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledTextInput } from "../components/forms/ControlledTextInput";

interface signUpScreenProp {
  navigation: NativeStackNavigationProp<ScreenParamList, "SignUp">;
  route: RouteProp<ScreenParamList, "SignUp">;
}

const SignUpForm = z
  .object({
    email: z.string().email(),
    username: z.string().min(1),
    description: z.string().min(1),
    password: z.string().min(1),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords don't match",
    path: ["confirmPassword"],
  });
type ISignUpForm = z.infer<typeof SignUpForm>;

export const SignUpScreen = ({ navigation }: signUpScreenProp) => {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignUpForm),
  });

  useEffect(() => {
    const fieldsInError = Object.keys(errors).sort().join(" ");
    console.log(errors);
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

  const onSignUp = (formData: ISignUpForm) => {
    console.log(formData);
    return new Promise((resolve) => setTimeout(resolve, 2000));
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
  textArea: {},
});

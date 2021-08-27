import React, { useEffect, useState } from "react";
import { login } from "../api/Users";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "./Screens";
import { RouteProp } from "@react-navigation/native";
import { TextInput } from "../components/forms/TextInput";
import { Form } from "../components/forms/Form";
import { AirbnbSignView } from "../components/AirbnbSignView";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignInScreenProp {
  navigation: NativeStackNavigationProp<ScreenParamList, "SignIn">;
  route: RouteProp<ScreenParamList, "SignIn">;
}

const SignInForm = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type ISignInForm = z.infer<typeof SignInForm>;

export const SignInScreen = ({ navigation }: SignInScreenProp) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignInForm),
  });

  useEffect(() => {
    const fieldsInError = Object.keys(errors).sort().join(" ");
    switch (fieldsInError) {
      case "email password":
      case "password":
        setErrorMessage("Please fill all fields");
        break;
      case "email":
        setErrorMessage(errors.email.message);
        break;
      default:
        setErrorMessage("");
    }
  }, [errors]);

  const onSignIn = ({ email, password }: ISignInForm) =>
    login(email, password)
      .then((userInfo) => {
        setErrorMessage(`Hello ${userInfo.username}`);
        alert(JSON.stringify(userInfo));
      })
      .catch((error: Error) => {
        if (error.message.match("401"))
          setErrorMessage("Invalid username/password");
        else setErrorMessage(error.message);
      });

  return (
    <AirbnbSignView>
      <Form
        errorMessage={errorMessage}
        title="Sign in"
        validationButtonName="Sign in"
        validationButtonDisabled={isSubmitting}
        linkButtonName="No account? Register"
        onValidationButtonPress={handleSubmit(onSignIn)}
        onLinkButtonPress={() => navigation.navigate("SignUp")}
      >
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="email"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="password"
              value={value}
              secureTextEntry={true}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
          name="password"
          defaultValue=""
        />
      </Form>
    </AirbnbSignView>
  );
};

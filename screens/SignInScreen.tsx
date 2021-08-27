import React, { useEffect, useState } from "react";
import { login } from "../api/User";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScreenParamList } from "./Screens";
import { RouteProp } from "@react-navigation/native";
import { Form } from "../components/forms/Form";
import { AirbnbSignView } from "../components/AirbnbSignView";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledTextInput } from "../components/forms/ControlledTextInput";
import { UserSignInForms, UserSignInSchema } from "../api/UserSchema";

interface SignInScreenProp {
  navigation: NativeStackNavigationProp<ScreenParamList, "SignIn">;
  route: RouteProp<ScreenParamList, "SignIn">;
}

export const SignInScreen = ({ navigation }: SignInScreenProp) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSignInSchema),
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
      default:
        setErrorMessage("Please fill all fields");
    }
  }, [errors]);

  const onSignIn = (formData: UserSignInForms) =>
    login(formData)
      .then((userInfo) => {
        setErrorMessage(`Hello ${userInfo.username}`);
        alert(JSON.stringify(userInfo));
      })
      .catch((error: Error) => {
        if (error.message.match("401"))
          setErrorMessage("Invalid username/password");
        else setErrorMessage(error.message);
        console.log(error);
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
        <ControlledTextInput control={control} name="email" />
        <ControlledTextInput
          control={control}
          name="password"
          secureTextEntry={true}
        />
      </Form>
    </AirbnbSignView>
  );
};

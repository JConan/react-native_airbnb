import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { Form } from "../components/forms/Form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledTextInput } from "../components/forms/ControlledTextInput";
import {
  UserInfo,
  UserSignUpForm,
  UserSignUpFormSchema,
} from "../api/UserSchema";
import { signUp } from "../api/User";
import { AxiosError } from "axios";
import { BaseView } from "../components/BaseView";
import { UserAccountNavigationProps } from "../navigations/UserAccountNavigatorStacks";

interface Props extends UserAccountNavigationProps<"SignUp"> {
  storeUserInfo: (userInfo: UserInfo) => void;
}

export const SignUpScreen = ({ navigation, storeUserInfo }: Props) => {
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
    console.log("allo");

    return signUp(formData)
      .then((userInfo) => {
        setErrorMessage(`Bienvenue ${userInfo.username}`);
        alert(JSON.stringify(userInfo));
        storeUserInfo(userInfo);
      })
      .catch((error: AxiosError<{ error: string }>) => {
        if (error.message.match("400")) {
          setErrorMessage(error.response!.data.error);
        } else setErrorMessage(error.message);
      });
  };

  return (
    <BaseView>
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
          textStyle={{
            height: 100,
          }}
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
    </BaseView>
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

import React, { useEffect, useState } from "react";
import { login } from "../api/User";
import { Form } from "../components/forms/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControlledTextInput } from "../components/forms/ControlledTextInput";
import {
  UserInfo,
  UserSignInForms,
  UserSignInFormSchema,
} from "../api/UserSchema";
import { BaseView } from "../components/BaseView";
import { UserAccountNavigationProps } from "../navigations/UserAccountNavigatorStacks";

interface Props extends UserAccountNavigationProps<"SignIn"> {
  storeUserInfo: (userInfo: UserInfo) => void;
}

export const SignInScreen = ({ navigation, storeUserInfo }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(UserSignInFormSchema),
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
        storeUserInfo(userInfo);
      })
      .catch((error: Error) => {
        if (error.message.match("401"))
          setErrorMessage("Invalid username/password");
        else setErrorMessage(error.message);
      });

  return (
    <BaseView>
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
    </BaseView>
  );
};

const handleErrors = () => "";

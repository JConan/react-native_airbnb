import { SignInScreen } from "./SignInScreen";
import { SignUpScreen } from "./SignUpScreen";

export type ScreenParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

export default {
  SignUp: SignUpScreen,
  SignIn: SignInScreen,
};

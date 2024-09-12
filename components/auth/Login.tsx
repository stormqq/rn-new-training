import React from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";

const Login = () => {
  const { setUser, setAuthError } = useAuthStore();

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setUser(response.data?.user);
        router.replace("./home");
      } else {
        setAuthError("Sign in error");
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        setAuthError(error.code + ": " + error.message);
      }
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      style={{ alignSelf: "center" }}
      onPress={signIn}
    />
  );
};

export default Login;

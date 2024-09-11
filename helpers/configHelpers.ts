import { GoogleSignin } from "@react-native-google-signin/google-signin";

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId:
      "11499638147-lggaeotgrn1cnkl2185656jdrev01li1.apps.googleusercontent.com",
  });
};

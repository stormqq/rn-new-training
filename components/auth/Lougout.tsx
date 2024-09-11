import React from "react";
import { Button } from "react-native-paper";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useAuthStore } from "@/store/useAuthStore";
import { router } from "expo-router";

const Lougout = () => {
  const { setUser } = useAuthStore();
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUser(null);
      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return <Button mode="contained" onPress={signOut}>LOGOUT</Button>;
};

export default Lougout;

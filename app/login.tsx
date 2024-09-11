import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Login from "@/components/auth/Login";
import { router } from "expo-router";

const LoginScreen = () => {
  const { user, authError } = useAuthStore();

  if (user) {
    router.push("/home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>LOGIN PAGE</Text>
      <Login />
      {authError && <Text style={styles.error}>{authError}</Text>}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  label: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

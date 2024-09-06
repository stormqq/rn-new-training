import React, { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Stack, useRouter } from "expo-router";
import { Button, Text } from "react-native-paper";

const LockScreen = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkDeviceForHardware = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    };
    checkDeviceForHardware();
  }, []);

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Unlock with Biometrics",
        fallbackLabel: "Use Passcode",
      });

      if (result.success) {
        setIsAuthenticated(true);
        Alert.alert("Success", "You are authenticated!");
        router.push("/home");
      } else {
        Alert.alert("Failed", "Authentication failed, try again.");
      }
    } catch (error) {
      console.log("Error during authentication", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/home");
    }
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, gap: 10, justifyContent: "center", alignItems: "center" }}>
      <>
        <Stack.Screen options={{ header: () => null }} />
        <Text style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "black",
        }}>Biometric Authentication</Text>
        {isBiometricSupported ? (
          <Button mode="contained-tonal" onPress={authenticate}>Authenticate</Button>
        ) : (
          <Text>Biometric Authentication is not supported on this device</Text>
        )}
      </>
    </View>
  );
};

export default LockScreen;

import { useState, useEffect } from "react";
import { AppState } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export function useLocalAuth() {
  const [authError, setAuthError] = useState<string | null>(null);

  const authenticate = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock with Biometrics",
      fallbackLabel: "Use Passcode",
    });

    if (!result.success) {
      setAuthError("Authentication failed. Please try again.");
    } else {
      setAuthError(null);
    }
  };

  useEffect(() => {
    authenticate();

    const subscription = AppState.addEventListener(
      "change",
      async (nextAppState) => {
        if (nextAppState === "active") {
          authenticate();
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  return { authError, authenticate };
}

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "react-query";
import { useThemeStore } from "@/store/useThemeStore";
import { PaperProvider, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "@/themes/themes";
import { StatusBar } from "expo-status-bar";
import { AppState, View } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { currentTheme, setTheme } = useThemeStore();

  const [appState, setAppState] = useState(AppState.currentState);
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
        if (appState === "background" && nextAppState === "active") {
          authenticate();
        }
        setAppState(nextAppState);
      }
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
        <StatusBar translucent={false} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        {authError && (
          <View
            style={{
              padding: 16,
              backgroundColor: "red",
              alignItems: "center",
            }}
          >
            <Text onPress={authenticate} style={{ color: "white" }}>
              {authError}
            </Text>
          </View>
        )}
      </PaperProvider>
    </QueryClientProvider>
  );
}

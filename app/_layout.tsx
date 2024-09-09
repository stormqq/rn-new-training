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
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastProvider } from "react-native-toast-notifications";
import { useAuth } from "@/hooks/useAuth";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const { currentTheme, setTheme } = useThemeStore();

  const { authError, authenticate } = useAuth();

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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ToastProvider>
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
          </ToastProvider>
        </GestureHandlerRootView>
      </PaperProvider>
    </QueryClientProvider>
  );
}

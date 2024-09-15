import { useFonts } from "expo-font";
import { router, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import styled from "styled-components/native";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import { QueryClient, QueryClientProvider } from "react-query";
import { useThemeStore } from "@/src/store/useThemeStore";
import { PaperProvider, Text } from "react-native-paper";
import { darkTheme, lightTheme } from "@/src/themes/themes";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useLocalAuth } from "@/src/hooks/useLocalAuth";
import { useAuthStore } from "@/src/store/useAuthStore";
import { configureGoogleSignIn } from "@/src/helpers/configHelpers";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient();

export default function RootLayout() {
  const { user, authError } = useAuthStore();
  const colorScheme = useColorScheme();
  const { currentTheme, setTheme } = useThemeStore();
  const { authenticate } = useLocalAuth();

  // * initial user settings setup
  useEffect(() => {
    setTheme(colorScheme);
    configureGoogleSignIn();
  }, []);

  const [fontsLoaded] = useFonts({
    SpaceMono: require("../src/assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (fontsLoaded) {
      router.replace(user ? "/home" : "/login");
    }
  }, [user, fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <StatusBar translucent={false} />
          <Slot />
          {authError && (
            <ErrorContainer>
              <ErrorText onPress={authenticate} style={{ color: "white" }}>
                {authError}
              </ErrorText>
            </ErrorContainer>
          )}
        </GestureHandlerRootView>
      </PaperProvider>
    </QueryClientProvider>
  );
}

const ErrorContainer = styled.View`
  padding: 16px;
  align-items: center;
  background-color: "red";
`;

const ErrorText = styled(Text)`
  color: "white";
`;

import { useThemeStore } from "@/store/useThemeStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Image,
  Platform,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Switch, useTheme } from "react-native-paper";

export default function TabTwoScreen() {
  const { currentTheme, toggleTheme } = useThemeStore();
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 30 }}>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <Text style={{ fontSize: 30, color: theme.colors.onError }}>Change theme</Text>
        <Switch value={currentTheme  === "dark"} color="#0a7ea4" onValueChange={toggleTheme} />
      </View>
      <Text style={{ fontSize: 30, color: theme.colors.surface }}>Change theme</Text>
      <Text style={{ fontSize: 30, color: theme.colors.onSurface }}>Change theme</Text>
    </SafeAreaView>
  );
}

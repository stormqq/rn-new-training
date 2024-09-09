import { useSettingsStore } from "@/store/useSettingsStore";
import { useThemeStore } from "@/store/useThemeStore";
import { CustomThemeType } from "@/themes/themes";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Switch, useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const { currentTheme, toggleTheme } = useThemeStore();
  const { isShakingModeActive, setIsShakingModeActive } = useSettingsStore();
  const theme: CustomThemeType = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.setting}>
        <Text style={{ fontSize: 30, color: theme.colors.text }}>
          Dark theme
        </Text>
        <Switch
          value={currentTheme === "dark"}
          color="#0a7ea4"
          onValueChange={toggleTheme}
        />
      </View>
      <View style={styles.setting}>
        <Text style={{ fontSize: 30, color: theme.colors.text }}>
          Shaking mode
        </Text>
        <Switch
          value={isShakingModeActive}
          color="#0a7ea4"
          onValueChange={setIsShakingModeActive}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
});

import Login from "@/components/auth/Login";
import Lougout from "@/components/auth/Lougout";
import { useAuthStore } from "@/store/useAuthStore";
import { useSettingsStore } from "@/store/useSettingsStore";
import { useThemeStore } from "@/store/useThemeStore";
import { CustomThemeType } from "@/themes/themes";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Switch, useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const { currentTheme, toggleTheme } = useThemeStore();
  const { isShakingModeActive, setIsShakingModeActive } = useSettingsStore();
  const theme: CustomThemeType = useTheme();
  const { user, authError } = useAuthStore();
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {user && (
        <Text style={{ fontSize: 30, alignSelf: "center", margin: 20, color: theme.colors.text }}>
          Hi,{" "}
          {
            <Text style={{ fontWeight: "bold", color: "purple" }}>
              {user.name}
            </Text>
          }
        </Text>
      )}
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
      <View style={styles.authButtons}>
      {user ? <Lougout /> : <Login />}
      {authError && <Text style={styles.authError}>{authError}</Text>}
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
  authButtons: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    padding: 20,
  },
  authError: {
    color: "red",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

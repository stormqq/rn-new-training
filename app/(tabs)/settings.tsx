import styled from "styled-components/native";
import Login from "@/src/components/Auth/Login";
import Lougout from "@/src/components/Auth/Lougout";
import { useAuthStore } from "@/src/store/useAuthStore";
import { useSettingsStore } from "@/src/store/useSettingsStore";
import { useThemeStore } from "@/src/store/useThemeStore";
import { CustomThemeType } from "@/src/themes/themes";
import { SafeAreaView, Text, View } from "react-native";
import { Button, Switch, useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const { currentTheme, toggleTheme } = useThemeStore();
  const { isShakingModeActive, setIsShakingModeActive } = useSettingsStore();
  const theme: CustomThemeType = useTheme();
  const { user, authError } = useAuthStore();

  return (
    <Container theme={theme}>
      {user && (
        <WelcomeText theme={theme}>
          Hi, <UserName>{user.name}</UserName>
        </WelcomeText>
      )}
      <SettingRow>
        <SettingLabel theme={theme}>Dark theme</SettingLabel>
        <Switch
          value={currentTheme === "dark"}
          color="#0a7ea4"
          onValueChange={toggleTheme}
        />
      </SettingRow>
      <SettingRow>
        <SettingLabel theme={theme}>Shaking mode</SettingLabel>
        <Switch
          value={isShakingModeActive}
          color="#0a7ea4"
          onValueChange={setIsShakingModeActive}
        />
      </SettingRow>
      <AuthButtons>
        {user && <Lougout />}
        {authError && <AuthError>{authError}</AuthError>}
      </AuthButtons>
    </Container>
  );
}

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const WelcomeText = styled(Text)`
  font-size: 30px;
  align-self: center;
  margin: 20px;
  color: ${(props) => props.theme.colors.text};
`;

const UserName = styled(Text)`
  font-weight: bold;
  color: purple;
`;

const SettingRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const SettingLabel = styled(Text)`
  font-size: 30px;
  color: ${(props) => props.theme.colors.text};
`;

const AuthButtons = styled(View)`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  padding: 20px;
`;

const AuthError = styled(Text)`
  color: red;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
`;

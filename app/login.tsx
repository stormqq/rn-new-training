import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { useAuthStore } from "@/store/useAuthStore";
import Login from "@/components/Auth/Login";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";

const LoginScreen = () => {
  const { user, authError } = useAuthStore();
  const theme = useTheme();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

  return (
    <Container theme={theme}>
      <Title theme={theme}>Welcome Back!</Title>
      <LoginWrapper theme={theme}>
        <Login />
        {authError && <ErrorText theme={theme}>{authError}</ErrorText>}
      </LoginWrapper>
    </Container>
  );
};

export default LoginScreen;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.background};
`;

const Title = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

const LoginWrapper = styled(View)`
  width: 100%;
  padding: 30px;
  background-color: ${(props) => props.theme.colors.surface};
  shadow-color: rgba(0, 0, 0, 0.3);
  shadow-offset: 0px 10px;
  shadow-opacity: 0.25;
  shadow-radius: 15px;
  elevation: 8;
  align-items: center;
`;

const ErrorText = styled(Text)`
  color: ${(props) => props.theme.colors.error};
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  margin-top: 15px;
`;

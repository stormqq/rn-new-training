import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

export default function SendScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Text>send</Text>
    </SafeAreaView>
  );
}

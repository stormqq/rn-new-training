import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/Other/TabBarIcon";
import { useTheme, Text } from "react-native-paper";
import { View } from "react-native";
import { CustomThemeType } from "@/themes/themes";

export default function TabLayout() {
  const theme: CustomThemeType = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderStartColor: theme.colors.onSurface,
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              borderRadius: 50, 
              backgroundColor: theme.colors.secondaryContainer,
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              bottom: 5,
              width: 100, 
              height: 60,
            }}>
              <TabBarIcon
              size={38}
                name={focused ? "camera" : "camera-outline"}
                color={color}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

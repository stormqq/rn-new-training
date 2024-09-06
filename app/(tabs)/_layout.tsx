import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useTheme, Text } from "react-native-paper";
import { View } from "react-native";

export default function TabLayout() {
  const theme = useTheme();
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
        name="send"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              position: "absolute",
              bottom: 5,
              borderRadius: 20, 
              backgroundColor: theme.colors.secondaryContainer, 
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              width: 100, 
              height: 60,
            }}>
              <TabBarIcon
                name={focused ? "send" : "send-outline"}
                color={color}
              />
              <Text style={{color: theme.colors.text, fontSize: 12}}>Send</Text>
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

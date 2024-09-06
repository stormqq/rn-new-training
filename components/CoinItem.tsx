import { View, Text } from "react-native";
import React from "react";
import { CoinMarkets } from "@/types/coinMarkets";
import { Avatar, useTheme } from "react-native-paper";
import { useSettingsStore } from "@/store/useSettingsStore";

const CoinItem = ({ coin, index }: { coin: CoinMarkets; index: number }) => {
  const theme = useTheme();
  const { isCurrentlyShaking } = useSettingsStore();
  
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        padding: 10,
        alignItems: "center",
        backgroundColor:
          index % 2 === 0 ? theme.colors.accent : theme.colors.background,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 10 }}
      >
        <Avatar.Image size={50} source={{ uri: coin.image }} />
        <View style={{ gap: 5 }}>
          <Text
            style={{ fontSize: 20, width: 150, color: theme.colors.onSurface }}
          >
            {coin.name}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={{ color: theme.colors.disabled }}>
              {isCurrentlyShaking ? `****` : `$${coin.current_price}`}
            </Text>
            <Text
              style={{
                color: coin.price_change_percentage_24h > 0 ? "green" : "red",
              }}
            >
              {isCurrentlyShaking
                ? `****`
                : `${coin.price_change_percentage_24h}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "column", alignItems: "flex-end", gap: 5 }}>
        <Text style={{ fontSize: 20, color: theme.colors.onSurface }}>
          {isCurrentlyShaking ? `****` : `${coin.current_price}`}
        </Text>
        <Text
          style={{
            color: theme.colors.disabled,
          }}
        >
          {isCurrentlyShaking ? `****` : `$${coin.high_24h}`}
        </Text>
      </View>
    </View>
  );
};

export default CoinItem;

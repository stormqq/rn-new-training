import { View, Text } from "react-native";
import React from "react";
import { CoinMarkets } from "@/types/coinMarkets";
import { Avatar, useTheme } from "react-native-paper";

const CoinItem = ({ coin }: { coin: CoinMarkets }) => {
  const theme = useTheme();
  const isCoinPriceFalling = coin.ath_change_percentage.toString()[0] === "-";
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        padding: 10,
        alignItems: "center",
        backgroundColor: theme.colors.surface,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", flex: 1, gap: 10 }}
      >
        <Avatar.Image size={50} source={{ uri: coin.image }} />
        <View>
          <Text style={{ fontSize: 20, width: 100 }}>{coin.name}</Text>
          <Text style={{ color: "gray" }}>{coin.current_price}</Text>
          <Text
            style={{
              color: isCoinPriceFalling ? "red" : "green",
            }}
          >
            {coin.ath_change_percentage}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
        <Text style={{ fontSize: 20 }}>{coin.current_price}</Text>
        <Text
          style={{
            color: coin.price_change_percentage_24h > 0 ? "green" : "red",
          }}
        >
          {coin.price_change_percentage_24h}
        </Text>
      </View>
    </View>
  );
};

export default CoinItem;

import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { CoinMarkets } from "@/types/coinMarkets";
import { Avatar, Button, useTheme } from "react-native-paper";
import { useSettingsStore } from "@/store/useSettingsStore";
import Animated, {
  FadeIn,
  LightSpeedOutLeft,
  useSharedValue,
} from "react-native-reanimated";
import SwipeableRow from "./SwipeableRow";
import { CustomThemeType } from "@/themes/themes";
const CoinItem = ({
  coin,
  index,
  removeCoin,
}: {
  coin: CoinMarkets;
  index: number;
  removeCoin: (id: string) => void;
}) => {
  const theme: CustomThemeType = useTheme();
  const { isCurrentlyShaking } = useSettingsStore();

  const myValue = useSharedValue(0);

  useEffect(() => {
    myValue.value = 0;
  }, [coin.id, myValue]);

  const handleRemoveItem = () => {
    removeCoin(coin.id);
  };

  return (
    <SwipeableRow handleAction={handleRemoveItem}>
      <Animated.View
        entering={FadeIn.delay(100 * index)}
        exiting={LightSpeedOutLeft.duration(500)}
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
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            gap: 10,
          }}
        >
          <Avatar.Image size={50} source={{ uri: coin.image }} />
          <View style={{ gap: 5 }}>
            <Text
              style={{
                fontSize: 20,
                width: 150,
                color: theme.colors.onSurface,
              }}
            >
              {coin.name}
            </Text>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
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
        <View
          style={{ flexDirection: "column", alignItems: "flex-end", gap: 5 }}
        >
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
      </Animated.View>
    </SwipeableRow>
  );
};

export default CoinItem;

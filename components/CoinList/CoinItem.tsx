import { Pressable, Text } from "react-native";
import React, { memo, useCallback } from "react";
import { CoinMarkets } from "@/types/coinMarkets";
import { Avatar, useTheme } from "react-native-paper";
import { useSettingsStore } from "@/store/useSettingsStore";
import Animated, { FadeIn, LightSpeedOutLeft } from "react-native-reanimated";
import SwipeableRow from "./SwipeableRow";
import { CustomThemeType } from "@/themes/themes";
import { Href, router } from "expo-router";
import styled from "styled-components/native";

type CoinItemProps = {
  coin: CoinMarkets;
  index: number;
  removeCoin: (id: string) => void;
};

const CoinItem = memo(({ coin, index, removeCoin }: CoinItemProps) => {
  const theme: CustomThemeType = useTheme();
  const { isCurrentlyShaking } = useSettingsStore();

  const handleRemoveItem = useCallback(() => {
    removeCoin(coin.id);
  }, [coin.id]);

  const handlePress = useCallback(() => {
    router.push(`/coin/${coin.id}` as Href);
  }, [coin.id]);

  return (
    <SwipeableRow handleAction={handleRemoveItem}>
      <Pressable onPress={handlePress}>
        <AnimatedContainer
          theme={theme}
          index={index}
          entering={FadeIn.delay(100 * index)}
          exiting={LightSpeedOutLeft.duration(500)}
        >
          <CoinInfoContainer>
            <Avatar.Image size={50} source={{ uri: coin.image }} />
            <CoinDetails>
              <CoinName theme={theme}>{coin.name}</CoinName>
              <PriceContainer>
                <PriceText theme={theme}>
                  {isCurrentlyShaking ? `****` : `$${coin.current_price}`}
                </PriceText>
                <PriceChange isPositive={coin.price_change_percentage_24h > 0}>
                  {isCurrentlyShaking
                    ? `****`
                    : `${coin.price_change_percentage_24h}%`}
                </PriceChange>
              </PriceContainer>
            </CoinDetails>
          </CoinInfoContainer>

          <RightSection>
            <CoinPrice theme={theme}>
              {isCurrentlyShaking ? `****` : `$${coin.current_price}`}
            </CoinPrice>
            <HighPrice theme={theme}>
              {isCurrentlyShaking ? `****` : `$${coin.high_24h}`}
            </HighPrice>
          </RightSection>
        </AnimatedContainer>
      </Pressable>
    </SwipeableRow>
  );
});

export default CoinItem;

const AnimatedContainer = styled(Animated.View)<{
  theme: CustomThemeType;
  index: number;
}>`
  flex-direction: row;
  gap: 10px;
  padding: 10px;
  align-items: center;
  background-color: ${({ theme, index }) =>
    index % 2 === 0 ? theme.colors.accent : theme.colors.background};
`;

const CoinInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  gap: 10px;
`;

const CoinDetails = styled.View`
  gap: 5px;
`;

const CoinName = styled(Text)<{ theme: CustomThemeType }>`
  font-size: 20px;
  width: 150px;
  color: ${({ theme }) => theme.colors.onSurface};
`;

const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const PriceText = styled(Text)<{ theme: CustomThemeType }>`
  color: ${({ theme }) => theme.colors.disabled};
`;

const PriceChange = styled(Text)<{ isPositive: boolean }>`
  color: ${({ isPositive }) => (isPositive ? "green" : "red")};
`;

const RightSection = styled.View`
  flex-direction: column;
  align-items: flex-end;
  gap: 5px;
`;

const CoinPrice = styled(Text)<{ theme: CustomThemeType }>`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.onSurface};
`;

const HighPrice = styled(Text)<{ theme: CustomThemeType }>`
  color: ${({ theme }) => theme.colors.disabled};
`;

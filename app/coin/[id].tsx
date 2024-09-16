import React, { useCallback, useMemo } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import { queryClient } from "../_layout";
import { CoinMarkets } from "@/src/types/coinMarkets";
import { CustomThemeType } from "@/src/themes/themes";
import { CoinPriceChart } from "@/src/components/CoinDetails/PriceChart";
import { mockCoinData } from "@/src/constants/coinDataMock";
import { CoinInfoRow } from "@/src/components/CoinDetails/InfoRow";
import { useFavoriteCoin } from "@/src/hooks/useFavoriteCoin";
import { useToastStore } from "@/src/store/useToastStore";
import { ToastType } from "@/src/types/toast";

const CoinCard = () => {
  const { id } = useLocalSearchParams();
  const theme: CustomThemeType = useTheme();
  const { addNotification } = useToastStore();

  const coin = useMemo(() => {
    return queryClient
      .getQueryData<CoinMarkets[]>(["marketCoins"])
      ?.find((coin) => coin.id === id);
  }, [id]);

  const { toggleFavorite, isFavorite } = useFavoriteCoin(coin?.id);

  const handleToggleFavorite = useCallback(async () => {
    if (!coin?.id) return;

    await toggleFavorite();

    if (isFavorite) {
      addNotification(
        `Coin ${coin.name} removed from favorites`,
        ToastType.ERROR
      );
    } else {
      addNotification(
        `Coin ${coin.name} added to favorites`,
        ToastType.SUCCESS
      );
    }
  }, [coin, isFavorite, toggleFavorite, addNotification]);

  return (
    <Container theme={theme}>
      <UpperBar>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <CoinInfo>
          <Avatar.Image size={30} source={{ uri: coin?.image }} />
          <CoinName theme={theme}>{coin?.name}</CoinName>
        </CoinInfo>
        <IconButton
          icon={isFavorite ? "heart" : "heart-outline"}
          onPress={handleToggleFavorite}
        />
      </UpperBar>

      <StyledScrollView
        contentContainerStyle={{ alignItems: "center", padding: 20, gap: 30 }}
      >
        <About theme={theme}>
          <StyledCoinPriceChart>
            <CoinPriceChart data={mockCoinData} />
          </StyledCoinPriceChart>
        </About>

        <About theme={theme}>
          <CoinInfoRow
            label="Market Rank"
            value={`#${coin?.market_cap_rank}`}
          />
          <CoinInfoRow
            label="Current price"
            value={`$${coin?.current_price}`}
          />
          <CoinInfoRow
            label="Change percentage"
            value={`$${coin?.price_change_percentage_24h}`}
          />
          <CoinInfoRow label="High 24h" value={`$${coin?.high_24h}`} />
          <CoinInfoRow label="Low 24h" value={`$${coin?.low_24h}`} />
        </About>
      </StyledScrollView>
    </Container>
  );
};

export default CoinCard;

const Container = styled.View<{ theme: CustomThemeType }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
`;

const UpperBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
`;

const CoinInfo = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const CoinName = styled(Text)<{ theme: CustomThemeType }>`
  font-size: 20px;
  color: ${(props) => props.theme.colors.onSurface};
`;

const StyledScrollView = styled(ScrollView)`
  width: 100%;
`;

const StyledCoinPriceChart = styled.View`
  padding: 20px;
  overflow: hidden;
`;

const About = styled.View<{ theme: CustomThemeType }>`
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: 10px;
  width: 100%;
`;

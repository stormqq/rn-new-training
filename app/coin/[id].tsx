import React, { useMemo } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import { queryClient } from "../_layout";
import { CoinMarkets } from "@/src/types/coinMarkets";
import { CustomThemeType } from "@/src/themes/themes";
import { useToasts } from "@/src/hooks/useToasts";
import { Toast } from "@/src/components/Other/Toast";
import { CoinPriceChart } from "@/src/components/CoinDetails/PriceChart";
import { mockCoinData } from "@/src/constants/coinDataMock";
import { useFavoriteCoins } from "@/src/hooks/useFavoriteCoins";
import { CoinInfoRow } from "@/src/components/CoinDetails/InfoRow";

const CoinCard = () => {
  const { id } = useLocalSearchParams();
  const theme: CustomThemeType = useTheme();
  const { notifications, addNotification, removeNotification } = useToasts();

  const coin = useMemo(() => {
    return queryClient
      .getQueryData<CoinMarkets[]>(["marketCoins"])
      ?.find((coin) => coin.id === id);
  }, [id]);

  const { favorites, toggleFavorite } = useFavoriteCoins(coin?.id);

  const handleFavoriteToggle = async () => {
    if (!coin) return;

    const isFavorite = await toggleFavorite();
    if (isFavorite) {
      addNotification("Added to favorites", "SUCCESS");
    } else {
      addNotification("Removed from favorites", "INFO");
    }
  };

  return (
    <Container theme={theme}>
      <UpperBar>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <CoinInfo>
          <Avatar.Image size={30} source={{ uri: coin?.image }} />
          <CoinName theme={theme}>{coin?.name}</CoinName>
        </CoinInfo>
        <IconButton
          icon={
            favorites.includes(coin?.id as string) ? "heart" : "heart-outline"
          }
          onPress={handleFavoriteToggle}
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

      <NotificationContainer>
        {notifications.map((notification, index) => (
          <Toast
            key={notification.id}
            id={notification.id}
            index={index}
            onRemove={removeNotification}
            text={notification.text}
            type={notification.type}
          />
        ))}
      </NotificationContainer>
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

const NotificationContainer = styled.View`
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  align-items: center;
`;

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RefreshControl, LayoutAnimation } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "react-native-paper";
import { useMarketCoins } from "@/api/marketCoins";
import SearchCoinBar from "@/components/CoinList/SearchCoinBar";
import CoinItem from "@/components/CoinList/CoinItem";
import { filterBySearchQuery } from "@/helpers/filterBySearchQuery";
import { CoinMarkets } from "@/types/coinMarkets";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Toast } from "@/components/Other/Toast";
import { useToasts } from "@/hooks/useToasts";
import { CustomThemeType } from "@/themes/themes";
import styled from "styled-components/native";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isLoading } = useMarketCoins();
  const [coins, setCoins] = useState(data || []);

  const { notifications, addNotification, removeNotification } = useToasts();

  const listRef = useRef<FlashList<number> | null>(null);

  useEffect(() => {
    if (data) setCoins(data);
  }, [data]);

  const filteredCoins = useMemo(
    () => filterBySearchQuery(coins, searchQuery),
    [coins, searchQuery]
  );

  const removeCoin = useCallback((id: string) => {
    setCoins((prevCoins: CoinMarkets[]) =>
      prevCoins.filter((coin) => coin.id !== id)
    );
    animateLayoutChanges();
  }, []);

  const animateLayoutChanges = useCallback(() => {
    listRef.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [listRef]);

  const theme: CustomThemeType = useTheme();
  const shouldUseFlashList = true;

  return (
    <SafeArea theme={theme}>
      <SearchCoinBar
        handleSearch={setSearchQuery}
        addNotification={addNotification}
      />
      {shouldUseFlashList ? (
        <FlashList
          ref={listRef}
          data={filteredCoins}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CoinItem coin={item} index={index} removeCoin={removeCoin} />
          )}
          estimatedItemSize={44}
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={isLoading} />
          }
        />
      ) : (
        <Animated.FlatList
          data={filteredCoins}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <CoinItem coin={item} index={index} removeCoin={removeCoin} />
          )}
          refreshControl={
            <RefreshControl onRefresh={refetch} refreshing={isLoading} />
          }
          itemLayoutAnimation={LinearTransition}
        />
      )}
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
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView<{ theme: CustomThemeType }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;
`;

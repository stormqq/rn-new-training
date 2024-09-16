import React, {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { RefreshControl, LayoutAnimation, ScrollViewProps } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "react-native-paper";
import { useMarketCoins } from "@/src/api/marketCoins";
import SearchCoinBar from "@/src/components/CoinList/SearchCoinBar";
import CoinItem from "@/src/components/CoinList/CoinItem";
import { filterBySearchQuery } from "@/src/helpers/filterBySearchQuery";
import { CoinMarkets } from "@/src/types/coinMarkets";
import Animated, { LinearTransition } from "react-native-reanimated";
import { CustomThemeType } from "@/src/themes/themes";
import styled from "styled-components/native";
import { useToastStore } from "@/src/store/useToastStore";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isLoading } = useMarketCoins();
  const [coins, setCoins] = useState(data || []);

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
    listRef.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  const theme: CustomThemeType = useTheme();

  const renderScrollComponent = useCallback(
    forwardRef((props: ScrollViewProps, ref) => (
      <Animated.ScrollView {...props} />
    )),
    []
  );

  const shouldUseFlashList = true;

  return (
    <SafeArea theme={theme}>
      <SearchCoinBar handleSearch={setSearchQuery} />
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
          renderScrollComponent={renderScrollComponent}
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
    </SafeArea>
  );
}

const SafeArea = styled.SafeAreaView<{ theme: CustomThemeType }>`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding: 10px;
`;

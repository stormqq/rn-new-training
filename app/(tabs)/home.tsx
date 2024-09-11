import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, RefreshControl, LayoutAnimation } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useTheme } from "react-native-paper";
import { useMarketCoins } from "@/api/marketCoins";
import SearchCoinBar from "@/components/SearchCoinBar";
import CoinItem from "@/components/CoinItem";
import { filterBySearchQuery } from "@/helpers/filterBySearchQuery";
import { CoinMarkets } from "@/types/coinMarkets";
import Animated, { LinearTransition } from "react-native-reanimated";
import { Toast } from "@/components/Toast";
import { useToasts } from "@/hooks/useToasts";
import { CustomThemeType } from "@/themes/themes";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isLoading } = useMarketCoins();
  const [coins, setCoins] = useState(data || []);

  const { notifications, addNotification, removeNotification } = useToasts();

  const listRef = useRef<FlashList<number> | null>(null);

  useEffect(() => {
    setCoins(data);
  }, [data]);

  const filteredCoins = useMemo(() => {
    return filterBySearchQuery(coins, searchQuery);
  }, [coins, searchQuery]);

  const removeCoin = (id: string) => {
    setCoins((prevCoins: CoinMarkets[]) =>
      prevCoins.filter((coin) => coin.id !== id)
    );

    animateLayoutChanges();
  };

  const animateLayoutChanges = () => {
    listRef.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 3000,
    });
  };

  const theme: CustomThemeType = useTheme();

  const shouldUseFlashList = true;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background, padding: 10 }}
    >
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
        />
      ))}
    </SafeAreaView>
  );
}

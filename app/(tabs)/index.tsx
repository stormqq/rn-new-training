import {
  SafeAreaView,
  RefreshControl,
} from "react-native";

import { FlashList } from "@shopify/flash-list";
import { useEffect, useMemo, useState } from "react";
import { useMarketCoins } from "@/api/marketCoins";
import SearchCoinBar from "@/components/SearchCoinBar";
import { useTheme } from "react-native-paper";
import CoinItem from "@/components/CoinItem";
import { filterBySearchQuery } from "@/helpers/filterBySearchQuery";
import { Accelerometer } from "expo-sensors";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Subscription } from "expo-sensors/build/Pedometer";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isLoading } = useMarketCoins();

  const { isShakingModeActive, setIsCurrentlyShaking } = useSettingsStore();
  const [shakeTimeout, setShakeTimeout] = useState(null);

  useEffect(() => {
    let subscription: Subscription;
    if (isShakingModeActive) {
      Accelerometer.setUpdateInterval(300);

      subscription = Accelerometer.addListener((accelerometerData) => {
        const { x, y, z } = accelerometerData;

        if (Math.abs(x) > 1.5 || Math.abs(y) > 1.5 || Math.abs(z) > 1.5) {
          setIsCurrentlyShaking(true);
          if (shakeTimeout) {
            clearTimeout(shakeTimeout);
          }
          const timeout = setTimeout(() => {
            setIsCurrentlyShaking(false);
            console.log("Shaking stopped");
          }, 2000);

          setShakeTimeout(timeout);
        }
      });
    }
    return () => {
      subscription && subscription.remove();
      if (shakeTimeout) {
        clearTimeout(shakeTimeout);
      }
    };
  }, [isShakingModeActive, shakeTimeout]);

  const filteredCoins = useMemo(() => {
    return filterBySearchQuery(data, searchQuery);
  }, [data, searchQuery]);

  const theme = useTheme();
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.background, padding: 10 }}
    >
      <SearchCoinBar handleSearch={setSearchQuery} />
      <FlashList
        data={filteredCoins}
        renderItem={({ item, index }) => (
          <CoinItem coin={item} index={index} />
        )}
        estimatedItemSize={44}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }
      />
    </SafeAreaView>
  );
}

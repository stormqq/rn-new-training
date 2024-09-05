import { Image, StyleSheet, Platform, Text, SafeAreaView, FlatList, RefreshControl } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { useEffect, useState } from "react";
import { useMarketCoins } from "@/api/marketCoins";
import SearchCoinBar from "@/components/SearchCoinBar";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";
import CoinItem from "@/components/CoinItem";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, refetch, isLoading } = useMarketCoins();
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background, padding: 10 }}>
      <SearchCoinBar handleSearch={setSearchQuery} />
      <FlashList
        data={data}
        renderItem={({ item }) => <CoinItem coin={item} />}
        estimatedItemSize={44}
        refreshControl={
          <RefreshControl onRefresh={refetch} refreshing={isLoading} />
        }
      />
    </SafeAreaView>
  );
}

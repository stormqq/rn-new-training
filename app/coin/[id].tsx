import { StyleSheet, View, ScrollView } from "react-native";
import React, { useMemo, useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Avatar, IconButton, Text, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient } from "../_layout";
import { CoinMarkets } from "@/types/coinMarkets";
import { CustomThemeType } from "@/themes/themes";
import { useToasts } from "@/hooks/useToasts";
import { Toast } from "@/components/Toast";
import { CoinPriceChart } from "@/components/PriceChart";
import { mockCoinData } from "@/constants/coinDataMock";

const CoinCard = () => {
  const { id } = useLocalSearchParams();
  const theme: CustomThemeType = useTheme();
  const { notifications, addNotification, removeNotification } = useToasts();
  const [favorites, setFavorites] = useState<string[]>([]);

  const coin = useMemo(() => {
    return queryClient
      .getQueryData<CoinMarkets[]>(["marketCoins"])
      ?.find((coin) => coin.id === id);
  }, [id]);

  useEffect(() => {
    const loadFavorites = async () => {
      const storedFavorites = await AsyncStorage.getItem("user");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async () => {
    try {
      if (!coin) {
        return;
      }
      const isFavorite = favorites.includes(coin?.id);
      const updatedFavorites = isFavorite
        ? favorites.filter((favId) => favId !== coin?.id)
        : [...favorites, coin?.id];

      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("user", JSON.stringify(updatedFavorites));

      if (isFavorite) {
        addNotification("Removed from favorites", "INFO");
      } else {
        addNotification("Added to favorites", "SUCCESS");
      }
    } catch (error) {
      addNotification("Failed to update favorites", "ERROR");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={styles.upperBar}>
        <IconButton icon="arrow-left" onPress={() => router.back()} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Avatar.Image size={30} source={{ uri: coin?.image }} />
          <Text style={{ fontSize: 20, color: theme.colors.onSurface }}>
            {coin?.name}
          </Text>
        </View>
        <IconButton
          icon={
            favorites.includes(coin?.id as string) ? "heart" : "heart-outline"
          }
          onPress={toggleFavorite}
        />
      </View>

      <ScrollView
        contentContainerStyle={{ alignItems: "center", padding: 20, gap: 30 }}
      >
        <View
          style={{
            ...styles.about,
            padding: 20,
            backgroundColor: theme.colors.accent,
          }}
        >
          <CoinPriceChart data={mockCoinData} />
        </View>

        <View
          style={{
            ...styles.about,
            backgroundColor: theme.colors.accent,
          }}
        >
          <View style={styles.infoRow}>
            <Text variant="titleMedium" style={styles.infoText}>
              Market Rank
            </Text>
            <Text variant="titleMedium">#{coin?.market_cap_rank}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="titleMedium" style={styles.infoText}>
              Current price
            </Text>
            <Text variant="titleMedium">${coin?.current_price}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="titleMedium" style={styles.infoText}>
              Change percentage
            </Text>
            <Text variant="titleMedium">
              ${coin?.price_change_percentage_24h}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="titleMedium" style={styles.infoText}>
              High 24h
            </Text>
            <Text variant="titleMedium">${coin?.high_24h}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text variant="titleMedium" style={styles.infoText}>
              Low 24h
            </Text>
            <Text variant="titleMedium">${coin?.low_24h}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.notificationContainer}>
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
      </View>
    </View>
  );
};

export default CoinCard;

const styles = StyleSheet.create({
  upperBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    color: "white",
    width: "100%",
  },
  about: {
    borderRadius: 10,
    width: "100%",
    overflow: "hidden",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  infoText: {
    color: "#9e9e9e",
  },
  notificationContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
  },
});

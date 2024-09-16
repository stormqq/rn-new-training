import { useEffect, useState, useCallback, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFavoriteCoins } from "../helpers/favoriteCoins";

export const useFavoriteCoin = (coinId: string | undefined) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const loadAllCoins = async () => {
      try {
        const favoriteTokens = await getFavoriteCoins();
        setFavorites(favoriteTokens);
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
    };

    loadAllCoins();
  }, []);

  const isFavorite = useMemo(
    () => coinId && favorites.includes(coinId),
    [coinId, favorites]
  );

  const toggleFavorite = useCallback(async () => {
    if (!coinId) return;

    try {
      const updatedFavorites = isFavorite
        ? favorites.filter((favId) => favId !== coinId)
        : [...favorites, coinId];

      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("user", JSON.stringify(updatedFavorites));
    } catch (err) {
      console.error("Failed to update favorites:", err);
    }
  }, [coinId, isFavorite, favorites]);

  return {
    isFavorite,
    toggleFavorite,
  };
};

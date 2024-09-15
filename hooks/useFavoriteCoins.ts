import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useFavoriteCoins = (coinId: string | undefined) => {
  const [favorites, setFavorites] = useState<string[]>([]);

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
    if (!coinId) {
      return;
    }
    const isFavorite = favorites.includes(coinId);
    const updatedFavorites = isFavorite
      ? favorites.filter((favId) => favId !== coinId)
      : [...favorites, coinId];

    setFavorites(updatedFavorites);
    await AsyncStorage.setItem("user", JSON.stringify(updatedFavorites));

    return isFavorite;
  };

  return {
    favorites,
    toggleFavorite,
  };
};

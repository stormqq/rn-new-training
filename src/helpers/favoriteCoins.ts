import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFavoriteCoins = async () => {
  try {
    const favorites = await AsyncStorage.getItem("user");
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

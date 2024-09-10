import { SafeAreaView } from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";
import LikeButton from "@/components/animations/LikeButton";
import { Pagination } from "@/components/animations/pagination/Pagination";
import Switch from "@/components/animations/Switch/Switch";
import ComparisonSlider from "@/components/CompareSlider";

export default function SendScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 100,
      }}
    >
      <LikeButton />
      <Pagination />
      <Switch />
      <ComparisonSlider
        image1="https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg"
        image2="https://kor.ill.in.ua/m/610x385/2781367.jpg"
      />
    </SafeAreaView>
  );
}

import { ColorSchemeName } from "react-native";
import { create } from "zustand";

interface ThemeState {
  currentTheme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()((set) => ({
  currentTheme: null,
  setTheme: (currentTheme: ColorSchemeName) => set({ currentTheme }),
  toggleTheme: () => set((state) => ({ currentTheme: state.currentTheme === 'light' ? "dark" : "light" })),
}));

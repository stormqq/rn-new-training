import { create } from "zustand";

interface SettingsState {
  isShakingModeActive: boolean;
  setIsShakingModeActive: () => void;
  isCurrentlyShaking: boolean;
  setIsCurrentlyShaking: (value: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  isShakingModeActive: false,
  setIsShakingModeActive: () =>
    set((state) => ({ isShakingModeActive: !state.isShakingModeActive })),
  isCurrentlyShaking: false,
  setIsCurrentlyShaking: (value) =>
    set((state) => ({ isCurrentlyShaking: value })),
}));

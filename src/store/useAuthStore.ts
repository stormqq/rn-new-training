import { create } from "zustand";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
interface UserState {
  user: FirebaseAuthTypes.User | null | any;
  setUser: (user: FirebaseAuthTypes.User | null | any) => void;
  authError: string | null;
  setAuthError: (error: string | null) => void;
}

export const useAuthStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  authError: null,
  setAuthError: (error) => set({ authError: error }),
}));

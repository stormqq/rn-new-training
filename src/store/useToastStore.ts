import { create } from "zustand";
import { ToastType } from "../types/toast";

interface Toast {
  id: number;
  text: string;
  type: ToastType;
}

interface ToastStore {
  notifications: Toast[];
  addNotification: (text: string, type: ToastType) => void;
  removeNotification: (id: number) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  notifications: [],
  addNotification: (text, type) =>
    set((state) => {
      const newNotification: Toast = { id: Date.now(), text, type };
      const notifications =
        state.notifications.length >= 3
          ? [...state.notifications.slice(1), newNotification]
          : [...state.notifications, newNotification];

      return { notifications };
    }),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

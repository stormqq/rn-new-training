import { useState } from "react";

export const useToasts = () => {
  const [notifications, setNotifications] = useState<{ id: number }[]>([]);

  const addNotification = () => {
    setNotifications((prev) => {
      if (prev.length >= 3) {
        return [...prev.slice(1), { id: Date.now() }];
      }
      return [...prev, { id: Date.now() }];
    });
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};

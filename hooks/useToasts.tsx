import { useState } from "react";

export const useToasts = () => {
  const [notifications, setNotifications] = useState<{ id: number, text: string, type: "SUCCESS" | "ERROR" | "INFO" }[]>([]);

  const addNotification = (
    text: string,
    type: "SUCCESS" | "ERROR" | "INFO"
  ) => {
    setNotifications((prev) => {
      if (prev.length >= 3) {
        return [...prev.slice(1), { id: Date.now(), text, type }];
      }
      return [...prev, { id: Date.now(), text, type }];
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

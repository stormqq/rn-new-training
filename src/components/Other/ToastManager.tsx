import React, { useEffect } from "react";
import { useToastStore } from "@/src/store/useToastStore";
import { Toast } from "@/src/components/Other/Toast";

export const ToastManager = () => {
  const { notifications, removeNotification } = useToastStore();

  if (notifications.length === 0) return null;

  return (
    <>
      {notifications.map((notification, index) => (
        <Toast
          key={notification.id}
          id={notification.id}
          index={index}
          onRemove={removeNotification}
          text={notification.text}
          type={notification.type}
        />
      ))}
    </>
  );
};

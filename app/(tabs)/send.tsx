import { View } from "react-native";
import React, { useState } from "react";
import { Button, Text } from "react-native-paper";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import * as Clipboard from "expo-clipboard";
import { Share } from "react-native";
import { useToasts } from "@/hooks/useToasts";
import { Toast } from "@/components/Toast";

export default function SendScreen() {
  const device = useCameraDevice("back");

  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);

  const { notifications, addNotification, removeNotification } = useToasts();

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      const scannedValue = codes[0]?.value;
      if (scannedValue !== lastScannedCode) {
        addNotification(`Scanned value: ${scannedValue}`, "INFO");
        setLastScannedCode(scannedValue ?? null);
      }
    },
  });

  const copyToClipboard = async () => {
    if (!lastScannedCode) {
      addNotification("No data to copy", "ERROR");
      return;
    }
    await Clipboard.setStringAsync(lastScannedCode);
    addNotification("Copied to clipboard", "SUCCESS");
  };

  const shareFetchedData = async () => {
    if (!lastScannedCode) {
      addNotification("No data to share", "ERROR");
      return;
    }
    await Share.share({
      message: lastScannedCode,
    });
  };

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          bottom: 30,
        }}
      >
        <Button onPress={copyToClipboard} mode="contained">
          COPY
        </Button>
        <Button onPress={shareFetchedData} mode="contained">
          SHARE
        </Button>
      </View>
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
    </View>
  );
}

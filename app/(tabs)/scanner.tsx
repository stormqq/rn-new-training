import React, { useCallback, useState } from "react";
import { Share } from "react-native";
import { Button, Text } from "react-native-paper";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";
import * as Clipboard from "expo-clipboard";
import { useToasts } from "@/src/hooks/useToasts";
import { Toast } from "@/src/components/Other/Toast";
import styled from "styled-components/native";

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

  const copyToClipboard = useCallback(async () => {
    if (!lastScannedCode) {
      addNotification("No data to copy", "ERROR");
      return;
    }
    await Clipboard.setStringAsync(lastScannedCode);
    addNotification("Copied to clipboard", "SUCCESS");
  }, [addNotification, lastScannedCode]);

  const shareFetchedData = useCallback(async () => {
    if (!lastScannedCode) {
      addNotification("No data to share", "ERROR");
      return;
    }
    await Share.share({ message: lastScannedCode });
  }, [addNotification, lastScannedCode]);

  if (!device) {
    return <Text>No camera device available</Text>;
  }

  return (
    <Container>
      <Camera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
      <Footer>
        <Button onPress={copyToClipboard} mode="contained">
          COPY
        </Button>
        <Button onPress={shareFetchedData} mode="contained">
          SHARE
        </Button>
      </Footer>
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
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
`;

const Footer = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  bottom: 30px;
`;

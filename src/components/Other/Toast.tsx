import { TOAST_COLORS, ToastType } from "@/src/types/toast";
import { memo } from "react";
import { StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type ToastProps = {
  id: number;
  index: number;
  onRemove: (id: number) => void;
  text: string;
  type: ToastType;
};

export const Toast = memo(({ id, index, onRemove, text, type }: ToastProps) => {
  const offsetX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetX.value }],
  }));

  const handleGesture = (event: { nativeEvent: { translationX: number } }) => {
    const { translationX } = event.nativeEvent;
    if (translationX < -100) {
      offsetX.value = withSpring(-500);
      setTimeout(() => onRemove(id), 300);
    } else {
      offsetX.value = withSpring(0);
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <Animated.View
        style={[
          { ...styles.toast, backgroundColor: TOAST_COLORS[type] },
          { bottom: 75 + index * 60 },
          animatedStyle,
        ]}
      >
        <Text style={styles.toastText}>{text}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
});

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 60,
    right: 60,
    padding: 15,
    borderRadius: 5,
    zIndex: 999,
  },
  toastText: {
    color: "white",
    fontWeight: "bold",
  },
});

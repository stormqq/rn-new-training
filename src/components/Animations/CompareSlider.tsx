import "react-native-gesture-handler";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  interpolate,
} from "react-native-reanimated";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function ComparisonSlider({
  image1,
  image2,
}: {
  image1: string;
  image2: string;
}) {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);
  const lastOffset = useSharedValue<number>(0);

  const IMAGE_WIDTH = 230;
  const MIN_LIMIT = -IMAGE_WIDTH / 2;
  const MAX_LIMIT = IMAGE_WIDTH / 2;

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange((event) => {
      offset.value = Math.min(
        Math.max(lastOffset.value + event.translationX, MIN_LIMIT),
        MAX_LIMIT
      );
    })
    .onFinalize(() => {
      lastOffset.value = offset.value;
      pressed.value = false;
    });

  const animatedImageStyle = useAnimatedStyle(() => ({
    width: IMAGE_WIDTH / 2 + offset.value,
    transform: [
      {
        scale: interpolate(Math.abs(offset.value), [0, 610], [1, 2], "clamp"),
      },
    ],
  }));

  const animatedBottomImageStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(Math.abs(offset.value), [0, 310], [1, 2], "clamp"),
      },
    ],
  }));

  const animatedHandleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
    backgroundColor: pressed.value ? "#FFE04B" : "#b58df1",
  }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Animated.View style={animatedBottomImageStyle}>
          <Image source={{ uri: image1 }} style={styles.image} />
        </Animated.View>

        <Animated.View style={[styles.imageOverlay, animatedImageStyle]}>
          <Image source={{ uri: image2 }} style={styles.image} />
        </Animated.View>

        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.circle, animatedHandleStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 20,
  },
  image: {
    width: 230,
    height: 230,
  },
  imageOverlay: {
    position: "absolute",
    left: 0,
    overflow: "hidden",
    height: 230,
  },
  circle: {
    height: 400,
    width: 20,
    backgroundColor: "#b58df1",
    position: "absolute",
    zIndex: 1,
  },
  grayscaleImage: {
    tintColor: "gray",
    opacity: 0.8,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: "white",
  },
});

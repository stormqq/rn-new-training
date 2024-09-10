import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Switch = () => {
  const isTurnedOn = useSharedValue(0);
  const height = useSharedValue(0);
  const width = useSharedValue(0);
  const trackColors = { on: "#6753FF", off: "#fa7f7c" };

  const duration = 300;

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      isTurnedOn.value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );

    return {
      backgroundColor: withTiming(color, { duration }),
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(isTurnedOn.value),
      [0, 1],
      [0, width.value - height.value]
    );

    return {
      transform: [{ translateX: withTiming(moveValue, { duration }) }],
      borderRadius: height.value / 2,
    };
  });

  const labelOnAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isTurnedOn.value, { duration }),
      transform: [
        {
          translateX: withTiming(isTurnedOn.value ? 25 : -width.value, {
            duration,
          }),
        },
      ],
    };
  });

  const labelOffAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isTurnedOn.value ? 0 : 1, { duration }),
      transform: [
        {
          translateX: withTiming(isTurnedOn.value ? width.value : -25, {
            duration,
          }),
        },
      ],
    };
  });

  const handlePress = () => {
    isTurnedOn.value = withTiming(Number(!isTurnedOn.value));
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[styles.track, styles.switch, trackAnimatedStyle]}
      >
        <Animated.Text
          style={[
            styles.switchStateLabel,
            styles.labelOn,
            labelOnAnimatedStyle,
          ]}
        >
          ON
        </Animated.Text>
        <Animated.Text
          style={[
            styles.switchStateLabel,
            styles.labelOff,
            labelOffAnimatedStyle,
          ]}
        >
          OFF
        </Animated.Text>
        <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  );
};

export default Switch;

const styles = StyleSheet.create({
  track: {
    alignItems: "flex-start",
    width: 100,
    height: 40,
    padding: 5,
    position: "relative",
  },
  thumb: {
    height: "100%",
    aspectRatio: 1,
    backgroundColor: "white",
  },
  switch: {
    width: 200,
    height: 80,
    padding: 10,
    justifyContent: "center",
  },
  switchStateLabel: {
    position: "absolute",
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
  },
  labelOn: {
    left: 25,
  },
  labelOff: {
    right: 25,
  },
});

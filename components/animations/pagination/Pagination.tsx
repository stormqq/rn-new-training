import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  ZoomIn,
  ZoomOut,
  SequencedTransition,
  withSpring,
} from "react-native-reanimated";

import { IconButton } from "react-native-paper";
import { Dot } from "./Dot";

export const Pagination = () => {
  const totalDots = 5;
  const dotsArray = Array.from({ length: totalDots }, (_, index) => index);

  const progress = useSharedValue(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    progress.value = withSpring(selected, { damping: 5, stiffness: 15 });
  }, [selected]);

  const handleLeftPress = () => {
    if (selected > 0) {
      setSelected((prev) => prev - 1);
    }
  };

  const handleRightPress = () => {
    if (selected < dotsArray.length - 1) {
      setSelected((prev) => prev + 1);
    }
  };

  return (
    <View style={styles.center}>
      <Animated.View style={styles.row}>
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          layout={SequencedTransition}
        >
          <Pressable onPressIn={handleLeftPress} style={styles.arrowButton}>
            <IconButton icon={"chevron-left"} />
          </Pressable>
        </Animated.View>
        <Animated.View
          layout={SequencedTransition}
          style={styles.dotsContainer}
        >
          {dotsArray.map((id) => (
            <Dot id={id} key={id} progress={progress} />
          ))}
        </Animated.View>
        <Animated.View
          entering={ZoomIn}
          exiting={ZoomOut}
          layout={SequencedTransition}
        >
          <Pressable onPressIn={handleRightPress} style={styles.arrowButton}>
            <IconButton icon={"chevron-right"} />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  arrowButton: {
    padding: 2,
    backgroundColor: "#e6e1e0",
    borderRadius: 20,
  },
  dotsContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#e6e1e0",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  icon: {
    color: "#726e6c",
  },
});

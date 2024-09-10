import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withSpring,
} from "react-native-reanimated";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const scaleValue = useSharedValue(1);
  const opacityValue = useSharedValue(1);
  const textScaleValue = useSharedValue(1);
  const innerCircleScaleValue = useSharedValue(1);
  const translateY = useSharedValue(0);
  const notifOpacity = useSharedValue(0);

  const animatedRipple = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleValue.value }],
      opacity: opacityValue.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: textScaleValue.value }],
    };
  });

  const animatedInnerCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: innerCircleScaleValue.value }],
    };
  });

  const animatedLikesNotifStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
      opacity: notifOpacity.value,
    };
  });

  const handlePressOutAnimation = () => {
    scaleValue.value = withTiming(3, { duration: 900 });
    opacityValue.value = withTiming(0, { duration: 900 });
    textScaleValue.value = withSequence(
      withTiming(1.4, { duration: 500 }),
      withTiming(1, { duration: 500 })
    );
    innerCircleScaleValue.value = withSequence(
      withTiming(0.7, { duration: 350 }),
      withTiming(1, { duration: 350 })
    );
    translateY.value = withSequence(
      withTiming(-80, { duration: 800 }),
      withTiming(0, { duration: 500 })
    );
    notifOpacity.value = withSequence(
      withTiming(1, { duration: 650 }),
      withTiming(0, { duration: 1000 })
    );
  };

  const handlePressInAnimation = () => {
    setLikes((prevLikes) => prevLikes + 1);
    scaleValue.value = 1;
    opacityValue.value = 1;
    textScaleValue.value = withTiming(0.7, { duration: 350 });
    innerCircleScaleValue.value = withSequence(
      withTiming(0.7, { duration: 350 }),
      withTiming(1, { duration: 350 })
    );
    translateY.value = 0;
    notifOpacity.value = withTiming(0, { duration: 1000 });
  };

  return (
    <View style={styles.rippleView}>
      <TouchableWithoutFeedback
        onPressIn={handlePressInAnimation}
        onPressOut={handlePressOutAnimation}
      >
        <View style={styles.circleContainer}>
          <Animated.View style={[styles.outerRipple, animatedRipple]} />
          <Animated.View style={[styles.likesNotif, animatedLikesNotifStyle]}>
            <Text style={styles.likesCount}>{likes}</Text>
          </Animated.View>
          <Animated.View style={[styles.innerCircle, animatedInnerCircleStyle]}>
            <Animated.Text style={[animatedTextStyle, styles.innerText]}>
              ❤️
            </Animated.Text>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  rippleView: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  outerRipple: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#E13534",
  },
  innerCircle: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: "#F9D0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  innerText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  likesNotif: {
    width: 60,
    height: 35,
    backgroundColor: "#E13534",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    position: "absolute",
  },
  likesCount: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

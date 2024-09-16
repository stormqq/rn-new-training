import React, { useRef, useCallback } from "react";
import { Animated, StyleSheet, Text, View, I18nManager } from "react-native";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { Icon } from "react-native-paper";

type SwipeableRowProps = {
  children: JSX.Element;
  handleAction: () => void;
};

const SwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  handleAction,
}) => {
  const swipeableRow = useRef<Swipeable>(null);

  const close = useCallback(() => {
    swipeableRow.current?.close();
  }, []);

  const renderRightAction = useCallback(
    (
      color: string,
      x: number,
      progress: Animated.AnimatedInterpolation<number>
    ) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [x, 0],
      });

      const pressHandler = () => {
        close();
        handleAction();
      };

      return (
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <RectButton
            style={[styles.rightAction, { backgroundColor: color }]}
            onPress={pressHandler}
          >
            <Icon source="delete" color="white" size={24} />
          </RectButton>
        </Animated.View>
      );
    },
    [close, handleAction]
  );

  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation<number>,
      _dragAnimatedValue: Animated.AnimatedInterpolation<number>
    ) => (
      <View
        style={{
          width: 100,
          flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
        }}
      >
        {renderRightAction("#dd2c00", 64, progress)}
      </View>
    ),
    [renderRightAction]
  );

  return (
    <Swipeable
      ref={swipeableRow}
      friction={2}
      enableTrackpadTwoFingerGesture
      leftThreshold={30}
      rightThreshold={40}
      renderRightActions={renderRightActions}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  actionText: {
    color: "white",
    fontSize: 16,
    backgroundColor: "transparent",
    padding: 10,
  },
  rightAction: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default SwipeableRow;

import { useAppTheme } from "@/store/theme";
import { useEffect } from "react";
import { StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ANIMATION_DURATION = 250;

export type TextFieldLabelProps = {
  error?: boolean;
  label: string;
  isActive: boolean;
  isFocused: boolean;
  offset: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
  };
  containerStyle?: StyleProp<ViewStyle>;
};

const FONT_SIZE = 16;
const ACTIVE_FONT_SIZE = 12;

const Label = ({
  error,
  label,
  offset,
  isActive,
  isFocused,
  containerStyle,
}: TextFieldLabelProps) => {
  const { x0, x1, y0, y1 } = offset;

  const progress = useDerivedValue(() => {
    return isFocused ? withTiming(1) : withTiming(0);
  }, [isFocused]);

  const translateX = useSharedValue(x0);
  const translateY = useSharedValue(y0);
  const fontSize = useSharedValue(FONT_SIZE);

  const { palette } = useAppTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      fontSize: fontSize.value,
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = error
      ? palette.error.main
      : interpolateColor(
          progress.value,
          [0, 1],
          [palette.slate[500], palette.primary.main],
        );
    return {
      lineHeight: fontSize.value,
      fontSize: fontSize.value,
      color,
    };
  });

  useEffect(() => {
    if (isActive) {
      translateX.value = withTiming(x1, {
        duration: ANIMATION_DURATION,
      });
      translateY.value = withTiming(y1, {
        duration: ANIMATION_DURATION,
      });
      fontSize.value = withTiming(ACTIVE_FONT_SIZE, {
        duration: ANIMATION_DURATION,
      });
    } else {
      translateX.value = withTiming(x0, {
        duration: ANIMATION_DURATION,
      });
      translateY.value = withTiming(y0, {
        duration: ANIMATION_DURATION,
      });
      fontSize.value = withTiming(FONT_SIZE, {
        duration: ANIMATION_DURATION,
      });
    }
  }, [fontSize, isActive, translateX, translateY, x0, x1, y0, y1]);

  return (
    <Animated.View style={[animatedStyle, styles.container, containerStyle]}>
      <Animated.Text style={[animatedTextStyle, styles.text]}>
        {label}
      </Animated.Text>
    </Animated.View>
  );
};
export default Label;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none",
  },
  text: {
    textAlign: "left",
  },
});

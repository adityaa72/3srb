import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  color?: string;
};

const Ripple = ({ children, disabled = false }: Props) => {
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const scale = useSharedValue(0);

  const width = useSharedValue(50);
  const height = useSharedValue(50);
  const animatedRef = useAnimatedRef();

  const rippleOpacity = useSharedValue(1);

  const tap = Gesture.LongPress()
    // .minDuration(100)
    .enabled(!disabled)
    .onStart(event => {
      const layout = measure(animatedRef);
      if (layout) {
        width.value = layout.width;
        height.value = layout.height;
      }

      centerX.value = event.x;
      centerY.value = event.y;
      rippleOpacity.value = 1;

      scale.value = 0;
      scale.value = withTiming(1, { duration: 1000 });
    })
    .onFinalize(() => {
      rippleOpacity.value = withTiming(0);
    });

  const style = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(width.value ** 2 + height.value ** 2) * 2;
    const translateX = centerX.value - circleRadius;
    const translateY = centerY.value - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: rippleOpacity.value,
      backgroundColor: "rgba(0,0,0,0.2)",
      left: 0,
      top: 0,
      position: "absolute",
      transform: [{ translateX }, { translateY }, { scale: scale.value }],
      zIndex: 0,
    };
  });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        ref={animatedRef}
        style={{
          overflow: "hidden",
        }}
      >
        {children}
        <Animated.View style={style} />
      </Animated.View>
    </GestureDetector>
  );
};

export default Ripple;

const styles = StyleSheet.create({});

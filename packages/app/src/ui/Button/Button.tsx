import Box from "@/ui/Box";
import Ripple from "@/ui/Ripple";
import Typography from "@/ui/Typography";
import {
  getColorByNotation,
  useAppTheme,
  type PaletteColorKeys,
} from "@/store/theme";
import Color from "color";
import { type ReactNode } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
} from "react-native";
import tw from "twrnc";

type Size = "small" | "medium" | "large";
type Variant = "text" | "standard";
type Props = TouchableOpacityProps & {
  children: ReactNode;
  color?: PaletteColorKeys;
  size?: Size;
  variant?: Variant;
  loading?: boolean;
};

const Button = ({
  children,
  color = "primary.main",
  size = "medium",
  variant = "standard",
  disabled = false,
  loading,
  ...otherProps
}: Props) => {
  const isDisabled = loading ? true : disabled;
  const theme = useAppTheme();
  const backgroundColor = getColorByNotation(color, theme);
  const btnTextColor = variant === "text" ? backgroundColor : "#fff";
  const rippleColor =
    variant === "text" ? Color(backgroundColor).alpha(0.4).hex() : undefined;

  return (
    <Box style={{ flexGrow: 0 }}>
      <TouchableOpacity
        disabled={isDisabled}
        style={[
          tw`shadow-lg`,
          styles.touchable,
          {
            borderRadius: theme.borderRadius,
            backgroundColor,
            ...(variant === "text" && {
              backgroundColor: undefined,
              borderRadius: theme.borderRadius / 2,
            }),
            ...(isDisabled && {
              opacity: 0.5,
            }),
          },
        ]}
        activeOpacity={0.8}
        {...otherProps}
      >
        <Ripple disabled={isDisabled} color={rippleColor}>
          <Box
            p={(size === "large" && 2) || (size === "medium" && 1.4) || 0.6}
            style={styles.button}
          >
            <Typography
              variant="button"
              {...(variant === "text" && {
                variant: "overline",
              })}
              style={{ color: btnTextColor, fontWeight: "700" }}
            >
              {loading ? "Please Wait..." : children}
            </Typography>
          </Box>
        </Ripple>
      </TouchableOpacity>
    </Box>
  );
};

const styles = StyleSheet.create({
  touchable: {
    padding: 0,
    overflow: "hidden",
  },
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Button;

import Box, { type BoxProps } from "@/ui/Box";
import {
  getColorByNotation,
  useAppTheme,
  type PaletteColorKeys,
} from "@/store/theme";
import { type TypographyVariants } from "@/theme/typography";
import { Text, type TextProps } from "react-native";
import tw from "twrnc";

export type TypographyProps = TextProps & {
  className?: string;
  variant?: TypographyVariants;
  color?: PaletteColorKeys;
  boxProps?: BoxProps;
};

const Typography = ({
  children,
  variant = "body1",
  boxProps,
  color = "text.primary",
  className,
  style,
  ...restProps
}: TypographyProps) => {
  const theme = useAppTheme();
  const textColor = getColorByNotation(color, theme);
  const variantStyle = theme.typography[variant];

  return (
    <Box {...boxProps}>
      <Text
        {...restProps}
        style={[
          tw`${className ?? ""}`,
          { color: textColor },
          variantStyle,
          style,
        ]}
      >
        {children}
      </Text>
    </Box>
  );
};
export default Typography;

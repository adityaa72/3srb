import Box, { type BoxProps } from "@/ui/Box";
import { useAppTheme } from "@store/theme";
import { type ReactNode } from "react";
import { type FlexStyle } from "react-native";

type Props = BoxProps & {
  children: ReactNode;
  spacing?: number;
  direction?: FlexStyle["flexDirection"];
  justifyContent?: FlexStyle["justifyContent"];
  alignItems?: FlexStyle["alignItems"];
};

const Stack = ({
  spacing = 1,
  style,
  direction = "column",
  justifyContent,
  alignItems,
  children,
  ...restProps
}: Props) => {
  const theme = useAppTheme();
  return (
    <Box
      style={[
        {
          gap: spacing * theme.spacing,
          flexDirection: direction,
          justifyContent,
          alignItems,
        },
        style,
      ]}
      {...restProps}
    >
      {children}
    </Box>
  );
};

export default Stack;

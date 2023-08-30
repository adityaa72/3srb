import Typography, { type TypographyProps } from "@/components/Typography";
import { type DrawerNavigationParamList } from "@/router/DrawerRouter";
import { type RootNavigatorParamList } from "@/router/RootRouter";
import {
  getColorByNotation,
  useAppTheme,
  type PaletteColorKeys,
} from "@/store/theme";
import { useLinkProps } from "@react-navigation/native";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

export type ScreenParamList = RootNavigatorParamList &
  DrawerNavigationParamList;
type LinkProps = TouchableOpacityProps & {
  typographyProps?: TypographyProps;
  color?: PaletteColorKeys;
  href: Parameters<typeof useLinkProps<ScreenParamList>>[0]["to"];
  action?: Parameters<typeof useLinkProps<ScreenParamList>>[0]["action"];
};

const Link = ({
  href,
  action,
  children,
  typographyProps,
  color = "blue.700",
  ...rest
}: LinkProps) => {
  const theme = useAppTheme();
  const { onPress, ...props } = useLinkProps({ to: href, action });
  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Typography
        style={{ color: getColorByNotation(color, theme) }}
        {...typographyProps}
      >
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

export default Link;

import {
  getColorByNotation,
  useAppTheme,
  type PaletteColorKeys,
} from "@store/theme";
import {
  View,
  type FlexStyle,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import tw from "twrnc";

export type BoxProps = ViewProps & {
  className?: string;
  bgcolor?: PaletteColorKeys;
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  borderRadius?: number;
  overflow?: FlexStyle["overflow"];
  elevation?: ViewStyle["elevation"];
};

const Box = ({
  children,
  style,
  bgcolor,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  borderRadius,
  overflow,
  elevation,
  className,
  ...rest
}: BoxProps) => {
  const theme = useAppTheme();
  const backgroundColor = bgcolor
    ? getColorByNotation(bgcolor, theme)
    : undefined;

  return (
    <View
      style={[
        {
          backgroundColor,
          paddingHorizontal: getNumericVal(theme.spacing, px),
          paddingVertical: getNumericVal(theme.spacing, py),
          paddingTop: getNumericVal(theme.spacing, pt),
          paddingBottom: getNumericVal(theme.spacing, pb),
          paddingLeft: getNumericVal(theme.spacing, pl),
          paddingRight: getNumericVal(theme.spacing, pr),
          padding: getNumericVal(theme.spacing, p),
          margin: getNumericVal(theme.spacing, m),
          marginHorizontal: getNumericVal(theme.spacing, mx),
          marginVertical: getNumericVal(theme.spacing, my),
          marginTop: getNumericVal(theme.spacing, mt),
          marginBottom: getNumericVal(theme.spacing, mb),
          marginLeft: getNumericVal(theme.spacing, ml),
          marginRight: getNumericVal(theme.spacing, mr),
          borderRadius: getNumericVal(theme.spacing, borderRadius),
          ...(overflow && {
            overflow,
          }),
          ...(elevation && {
            elevation,
          }),
        },
        style,
        tw`${className ?? ""}`,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};
export default Box;

function getNumericVal(spacing: number, value?: number) {
  if (value || value === 0) return spacing * value;
  return undefined;
}

import Box from "@/ui/Box";
import Ripple from "@/ui/Ripple";
import { TouchableOpacity, type TouchableOpacityProps } from "react-native";

export type IconButtonProps = TouchableOpacityProps;

const IconButton = ({ children, style, ...otherProps }: IconButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        {
          borderRadius: 999,
          overflow: "hidden",
          flexShrink: 0,
          padding: 0,
          margin: 0,
        },
        style,
      ]}
      {...otherProps}
    >
      <Ripple>
        <Box
          p={1}
          style={{
            borderRadius: 999,
            justifyContent: "center",
            alignItems: "center",
            aspectRatio: 1,
          }}
        >
          {children}
        </Box>
      </Ripple>
    </TouchableOpacity>
  );
};
export default IconButton;

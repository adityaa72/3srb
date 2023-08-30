import Box, { type BoxProps } from "@/components/Box";
import { useAppTheme } from "@/store/theme";
import { StyleSheet } from "react-native";

const Divider = ({ children, ...otherProps }: BoxProps) => {
  const theme = useAppTheme();
  const color = theme.palette.divider;
  return (
    <Box style={[{ borderBottomColor: color }, styles.divider]} {...otherProps}>
      <Box
        style={{
          backgroundColor: theme.palette.background.primary,
        }}
        className={`absolute self-center p-2`}
      >
        {children}
      </Box>
    </Box>
  );
};
export default Divider;
const styles = StyleSheet.create({
  divider: {
    display: "flex",
    justifyContent: "center",
    borderBottomWidth: 1,
  },
});

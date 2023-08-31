import { useAppTheme } from "@/store/theme";
import { StyleSheet } from "react-native";
import Box from "../Box";

type Props = {
  isFocused: boolean;
  error?: boolean;
};

const Outlined = ({ isFocused, error }: Props) => {
  const { palette } = useAppTheme();
  return (
    <Box
      style={[
        styles.container,
        isFocused
          ? {
              ...styles.activeContainer,
              borderColor: palette.primary.main,
            }
          : { borderColor: palette.gray[300] },
        error && {
          borderColor: palette.error.main,
        },
      ]}
    />
  );
};

export default Outlined;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    borderWidth: 1,
    borderRadius: 8,
  },
  activeContainer: {
    borderWidth: 2,
  },
});

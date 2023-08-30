import { StyleSheet } from "react-native";
import Box, { type BoxProps } from "../Box";

type Props = BoxProps & {
  children: React.ReactNode;
};
const Card = ({ children, style, ...otherProps }: Props) => {
  return (
    <Box
      className="overflow-hidden"
      bgcolor="background.primary"
      style={[styles.card, style]}
      borderRadius={2}
      {...otherProps}
    >
      {children}
    </Box>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    elevation: 0.2,
  },
});

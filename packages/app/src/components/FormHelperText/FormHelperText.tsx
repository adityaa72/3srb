import { APP_COLORS } from "@/theme/colors";
import { StyleSheet, Text, View } from "react-native";

export type FormHelperTextProps = {
  children: React.ReactNode;
  error?: boolean;
};

const FormHelperText = ({ children }: FormHelperTextProps) => {
  return (
    <View>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default FormHelperText;

const styles = StyleSheet.create({
  text: {
    color: APP_COLORS.error.main,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

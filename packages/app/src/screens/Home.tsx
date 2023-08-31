import { Link, Typography } from "@/ui";
import { toggleTheme } from "@store/theme";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Typography>Toggle Theme</Typography>
      </TouchableOpacity>
      <Link href={{ screen: "Register" }}>Go For Register</Link>
      <Link href={{ screen: "Login" }}>Go to Login</Link>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({});

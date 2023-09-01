import { Link, Typography } from "@/ui";
import { useNavigation } from "@react-navigation/native";
import { toggleTheme } from "@store/theme";
import { useUser } from "@store/user";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { type RootNavigation } from "../router/RootRouter";

const Home = () => {
  const navigation = useNavigation<RootNavigation>();
  const { user, logout } = useUser();
  const onLogout = () => {
    logout();
    navigation.navigate("Login");
  };
  return (
    <View>
      <Typography variant="h4">Hii {user?.name}</Typography>
      <Typography onPress={onLogout}>Logout</Typography>
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

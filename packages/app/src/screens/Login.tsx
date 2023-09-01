import AuthLayout from "@/sections/auth/layout";
import { LoginForm } from "@/sections/auth/login";
import { Link, Stack, Typography } from "@/ui";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@store/user";
import { useEffect } from "react";
import { ScrollView } from "react-native";
import { type RootNavigation } from "../router/RootRouter";

const Login = () => {
  const navigation = useNavigation<RootNavigation>();
  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) navigation.navigate("Home");
  }, [isAuthenticated, navigation]);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <AuthLayout>
        <LoginForm />
        <Stack
          direction="row"
          justifyContent="center"
        >
          <Typography>Don't Have An Account?</Typography>
          <Link href="/Register">Register</Link>
        </Stack>
      </AuthLayout>
    </ScrollView>
  );
};

export default Login;

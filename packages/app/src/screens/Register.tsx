import AuthLayout from "@/sections/auth/layout";
import { Link, Stack } from "@/ui";
import Typography from "@/ui/Typography";
import { ScrollView } from "react-native";
import { RegisterForm } from "../sections/auth/register";

const Register = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <AuthLayout>
        <RegisterForm />
        <Stack
          direction="row"
          className="self-center"
        >
          <Typography>Don't Have An Account?</Typography>
          <Link href="/Login">Login</Link>
        </Stack>
      </AuthLayout>
    </ScrollView>
  );
};

export default Register;

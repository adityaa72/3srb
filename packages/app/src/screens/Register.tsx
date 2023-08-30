import Link from "@/components/Link";
import Stack from "@/components/Stack/Stack";
import Typography from "@/components/Typography";
import AuthLayout from "@/sections/auth/layout";
import { ScrollView } from "react-native";
import { RegisterForm } from "../sections/auth/register";

const Register = () => {
  return (
    <ScrollView>
      <AuthLayout>
        <RegisterForm />
        <Stack direction="row" className="self-center">
          <Typography>Don't Have An Account?</Typography>
          <Link href="/Login">Login</Link>
        </Stack>
      </AuthLayout>
    </ScrollView>
  );
};

export default Register;

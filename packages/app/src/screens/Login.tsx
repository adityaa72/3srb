import Link from "@/components/Link";
import Stack from "@/components/Stack";
import Typography from "@/components/Typography";
import AuthLayout from "@/sections/auth/layout";
import { LoginForm } from "@/sections/auth/login";

const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
      <Stack direction="row" justifyContent="center">
        <Typography>Don't Have An Account?</Typography>
        <Link href="/Register">Register</Link>
      </Stack>
    </AuthLayout>
  );
};

export default Login;

import Button from "@/components/Button";
import Link from "@/components/Link";
import { RHFProvider, RHFTextField } from "@/components/RHF";
import Stack from "@/components/Stack/Stack";
import Typography from "@/components/Typography";
import { type RootNavigation } from "@/router/RootRouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Alert, View } from "react-native";
import { object, string } from "zod";

const validator = object({
  email: string().email().nonempty(),
  password: string().nonempty(),
  confirmPassword: string().nonempty(),
}).refine(
  values => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords are not matching",
    path: ["password"],
  },
);

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const navigation = useNavigation<RootNavigation>();
  const defaultValues: FormValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(validator),
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<FormValues> = data => {
    navigation.navigate("Login");
    Alert.alert("Hurray! You have successfully Registered");
  };

  return (
    <View style={{ gap: 16 }}>
      <RHFProvider methods={methods}>
        <RHFTextField label="Email" name="email" autoFocus />
        <RHFTextField label="Password" name="password" />
        <RHFTextField label="Confirm Password" name="confirmPassword" />
        <Button onPress={handleSubmit(onSubmit)} size="large">
          Press Me!
        </Button>
      </RHFProvider>

      <Stack direction="row" className="self-center">
        <Typography>Don't Have An Account?</Typography>
        <Link href="/Login">Login</Link>
      </Stack>
    </View>
  );
};

export default Register;

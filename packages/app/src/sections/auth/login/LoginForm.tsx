import Button from "@/components/Button";
import { RHFProvider, RHFTextField } from "@/components/RHF";
import { type RouterInput } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { object, string } from "zod";

const validator = object({
  email: string().email().nonempty(),
  password: string().nonempty("Password is required").min(5, ""),
});

type FormValues = RouterInput["user"]["auth"]["login"];
// const v =

const LoginForm = () => {
  const defaultValues: FormValues = {
    email: "",
    password: "",
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(validator),
  });
  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<FormValues> = data => {};

  return (
    <RHFProvider methods={methods}>
      <RHFTextField label="Email" name="email" keyboardType="email-address" />
      <RHFTextField label="Password" name="password" secureTextEntry />
      <Button onPress={handleSubmit(onSubmit)} size="large">
        Proceed
      </Button>
    </RHFProvider>
  );
};

export default LoginForm;

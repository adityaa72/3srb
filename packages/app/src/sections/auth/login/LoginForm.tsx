import { Button } from "@/ui";
import { RHFProvider, RHFTextField } from "@/components/RHF";
import { api, type RouterInput } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import authSchema from "@validations/user/auth";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = RouterInput["user"]["auth"]["login"];

const LoginForm = () => {
  const defaultValues: FormValues = {
    email: "",
    password: "",
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authSchema.login),
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = api.user.auth.login.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) => mutate(data);

  return (
    <RHFProvider methods={methods}>
      <RHFTextField<FormValues>
        label="Email"
        name="email"
        keyboardType="email-address"
      />
      <RHFTextField<FormValues>
        label="Password"
        name="password"
        secureTextEntry
      />
      <Button
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        size="large"
      >
        Proceed
      </Button>
    </RHFProvider>
  );
};

export default LoginForm;

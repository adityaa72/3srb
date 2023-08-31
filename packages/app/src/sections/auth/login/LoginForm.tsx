import { RHFProvider, RHFTextField } from "@/components/RHF";
import { Button } from "@/ui";
import { api, type RouterInput } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@store/user";
import authSchema from "@validations/user/auth";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = RouterInput["user"]["auth"]["login"];

const LoginForm = () => {
  const defaultValues: FormValues = {
    email: "princeraj9137@gmail.com",
    password: "admin790",
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authSchema.login),
  });
  const { handleSubmit } = methods;

  const { login } = useUser();
  const { mutate, isLoading } = api.user.auth.login.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess(data) {
        const { token, user } = data;
        login({ Authorization: token, user });
      },
    });

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

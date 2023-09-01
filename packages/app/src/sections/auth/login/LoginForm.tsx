import { RHFProvider, RHFTextField } from "@/components/RHF";
import { type RootNavigation } from "@/router/RootRouter";
import { Button } from "@/ui";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@store/user";
import authSchema from "@validations/user/auth";
import { type UserRouterInputs } from "@web/types";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = UserRouterInputs["auth"]["login"];

const LoginForm = () => {
  const navigation = useNavigation<RootNavigation>();
  const defaultValues: FormValues = {
    email: "",
    password: "",
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
        navigation.navigate("Home");
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

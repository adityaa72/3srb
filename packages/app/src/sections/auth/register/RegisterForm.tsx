import Button from "@/components/Button";
import { RHFProvider, RHFTextField } from "@/components/RHF";
import { api, type RouterInput } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import authSchema from "@validations/user/auth";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = RouterInput["user"]["auth"]["register"];

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  const defaultValues: FormValues = {
    step: 1,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authSchema.register),
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = api.user.auth.register.useMutation();
  const onSubmit: SubmitHandler<FormValues> = data => mutate(data);

  return (
    <RHFProvider methods={methods}>
      <RHFTextField<FormValues> label="Full Name" name="name" />
      <RHFTextField<FormValues>
        label="Email"
        name="email"
        keyboardType="email-address"
      />
      <RHFTextField<FormValues>
        label="Password"
        name="password"
        secureTextEntry
        showPassword={showPassword}
        onTogglePassword={handleTogglePassword}
      />
      <RHFTextField<FormValues>
        label="Confirm Password"
        name="confirmPassword"
        secureTextEntry
        showPassword={showPassword}
        onTogglePassword={handleTogglePassword}
      />
      <Button loading={isLoading} onPress={handleSubmit(onSubmit)} size="large">
        Proceed
      </Button>
    </RHFProvider>
  );
};

export default RegisterForm;

import Button from "@/components/Button";
import { RHFProvider, RHFTextField } from "@/components/RHF";
import { type RouterInput } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { object, string } from "zod";

const validator = object({
  email: string().email().nonempty(),
  password: string().nonempty("Password is required").min(5, ""),
});

type FormValues = RouterInput[""];

const RegisterForm = () => {
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

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);

  return (
    <RHFProvider methods={methods}>
      <RHFTextField label="Full Name" name="name" />
      <RHFTextField label="Email" name="email" keyboardType="email-address" />
      <RHFTextField
        label="Password"
        name="password"
        secureTextEntry
        showPassword={showPassword}
        onTogglePassword={handleTogglePassword}
      />
      <RHFTextField
        label="Confirm Password"
        name="confirmPassword"
        secureTextEntry
        showPassword={showPassword}
        onTogglePassword={handleTogglePassword}
      />
      <Button onPress={handleSubmit(onSubmit)} size="large">
        Proceed
      </Button>
    </RHFProvider>
  );
};

export default RegisterForm;

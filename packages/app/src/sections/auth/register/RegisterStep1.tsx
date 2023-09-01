import { RHFProvider, RHFTextField } from "@/components/RHF";
import { Box, Button, Link, Stack } from "@/ui";
import Typography from "@/ui/Typography";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@store/register";
import authSchema from "@validations/user/auth";
import { type UserRouterInputs } from "@web/types";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = Extract<UserRouterInputs["auth"]["register"], { step: 1 }>;

type Props = {
  formData: FormValues;
};

const RegisterStep1 = ({ formData }: Props) => {
  const { setStep2 } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => setShowPassword(!showPassword);
  const defaultValues: FormValues = formData;

  const methods = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(authSchema.register),
  });
  const { handleSubmit } = methods;

  const { mutate, isLoading } = api.user.auth.register.useMutation();
  const onSubmit: SubmitHandler<FormValues> = (data) =>
    mutate(data, {
      onSuccess() {
        setStep2(data);
      },
    });

  return (
    <Box className="gap-6">
      <RHFProvider methods={methods}>
        <RHFTextField<FormValues>
          label="Full Name"
          name="name"
        />
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
        <Button
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
          size="large"
        >
          Proceed
        </Button>
      </RHFProvider>
      <Stack
        direction="row"
        className="self-center"
      >
        <Typography>Don't Have An Account?</Typography>
        <Link href="/Login">Login</Link>
      </Stack>
    </Box>
  );
};

export default RegisterStep1;

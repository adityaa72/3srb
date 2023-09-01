import { RHFProvider, RHFTextField } from "@/components/RHF";
import { type RootNavigation } from "@/router/RootRouter";
import { Box, Button, Link, Stack } from "@/ui";
import Typography from "@/ui/Typography";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "@react-navigation/native";
import { useRegister } from "@store/register";
import authSchema from "@validations/user/auth";
import { type UserRouterInputs } from "@web/types";
import { useForm, type SubmitHandler } from "react-hook-form";

type FormValues = Extract<UserRouterInputs["auth"]["register"], { step: 2 }>;

type Props = {
  formData: FormValues;
};

const RegisterStep1 = ({ formData }: Props) => {
  const navigation = useNavigation<RootNavigation>();
  const { reset } = useRegister();
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
        reset();
        navigation.navigate("Login");
      },
    });

  return (
    <Box className="gap-6">
      <RHFProvider methods={methods}>
        <RHFTextField<FormValues>
          label="Otp"
          name="otp"
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

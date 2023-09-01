import AuthLayout from "@/sections/auth/layout";
import { RegisterStep1, RegisterStep2 } from "@/sections/auth/register";

import { useRegister } from "@store/register";
import { ScrollView } from "react-native";

const Register = () => {
  const data = useRegister();
  const { step } = data;
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      automaticallyAdjustKeyboardInsets={true}
    >
      <AuthLayout>
        {step === 1 ? (
          <RegisterStep1 formData={data} />
        ) : (
          <RegisterStep2 formData={data} />
        )}
      </AuthLayout>
    </ScrollView>
  );
};

export default Register;

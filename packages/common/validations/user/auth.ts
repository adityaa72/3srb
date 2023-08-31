import { discriminatedUnion, literal, object, string, type TypeOf } from "zod";
import zodSchemas from "../../utils/zod";

const email = string()
  .nonempty("Email is required")
  .max(100, "Email must be at most 100 characters")
  .email("Please enter a valid email address")
  .toLowerCase();

const register = discriminatedUnion("step", [
  object({ step: literal(1) }),
  object({ step: literal(2), otp: zodSchemas.otp() }),
])
  .and(
    object({
      email,
      name: string()
        .nonempty("Name is required")
        .min(2, "Name must be at least 2 characters"),
      password: zodSchemas.password("Password"),
      confirmPassword: zodSchemas.password("Confirm Password"),
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords are not matching",
  });

const login = object({ email, password: zodSchemas.password("Password") });

const forgotPassword = discriminatedUnion("step", [
  object({
    step: literal(1),
  }),
  object({
    step: literal(2),
    otp: zodSchemas.otp(),
    password: zodSchemas.password("Password"),
    confirmPassword: zodSchemas.password("Confirm Password"),
  }),
])
  .and(object({ email }))
  .refine(
    (data) => {
      if (data.step !== 2) return true;
      return data.password === data.confirmPassword;
    },
    {
      path: ["confirmPassword"],
      message: "Passwords are not matching",
    }
  );

export type AuthSchema = {
  register: TypeOf<typeof register>;
  login: TypeOf<typeof login>;
  forgotPassword: TypeOf<typeof forgotPassword>;
};

const authSchema = {
  forgotPassword,
  login,
  register,
};
export default authSchema;

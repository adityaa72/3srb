import { type Context } from "@/server/api/trpc";
import User from "@/server/libs/User";
import { type ResponseMessage } from "@/types";
import { createToken } from "@/utils/jwt";
import { type AuthSchema } from "@validations/user/auth";

const login = async ({
  ctx: _,
  input,
}: {
  ctx: Context;
  input: AuthSchema["login"];
}) => {
  const { email, password } = input;

  // login
  const user = await User.getInstance(email, "No User");
  await user.validateLogin(password);

  // create session token
  const token = createToken({
    payload: {
      userId: user.userId,
    },
  });

  return {
    message: "Login Successful",
    token,
  } satisfies ResponseMessage;
};
export default login;

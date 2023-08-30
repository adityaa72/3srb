import authSchema from "@validations/user/auth";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import controllers from "./controllers";

const register = publicProcedure
  .input(authSchema.register)
  .mutation(async ({ ctx, input }) => controllers.register({ ctx, input }));

const login = publicProcedure
  .input(authSchema.login)
  .mutation(async ({ ctx, input }) => controllers.login({ ctx, input }));

const forgotPassword = publicProcedure
  .input(authSchema.forgotPassword)
  .mutation(async ({ ctx, input }) =>
    controllers.forgotPassword({ ctx, input }),
  );

const authRouter = createTRPCRouter({
  register,
  login,
  forgotPassword,
});

export default authRouter;

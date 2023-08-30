import { createTRPCRouter } from "../trpc";
import authRouter from "./auth/router";

const userRouter = createTRPCRouter({
  auth: authRouter,
});
export default userRouter;

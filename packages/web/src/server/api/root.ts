import { createTRPCRouter } from "@/server/api/trpc";
import adminRouter from "./admin/router";
import userRouter from "./user/router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type Apple = { name: string };

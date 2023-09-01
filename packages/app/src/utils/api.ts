import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@web/types";
export const api = createTRPCReact<AppRouter>();

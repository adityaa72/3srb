import { type User } from "@prisma/client";

export type ResponseMessage = {
  message: string;
} & Record<string, unknown>;

export type RequiredField<T, K extends keyof T> = Omit<T, K> & {
  [P in K]: Exclude<T[P], null | undefined>;
};

export { type AppRouter } from "@/server/api/root";
export * from "@prisma/client";

export type UserJson = Omit<User, "password">;

export {
  type AdminRouterInputs,
  type AdminRouterOutputs,
  type BaseRouterInputs,
  type BaseRouterOutputs,
  type RouterInputs,
  type RouterOutputs,
  type UserRouterInputs,
  type UserRouterOutputs,
} from "@/utils/api";

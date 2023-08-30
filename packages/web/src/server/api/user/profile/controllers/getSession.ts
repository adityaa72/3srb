import { type UserContext } from "@/server/api/trpc";
import { type Schema } from "../schema";

const getSession = async ({
  ctx,
  input,
}: {
  ctx: UserContext;
  input: Schema["getSession"];
}) => {
  const {} = ctx;
};
export default getSession;

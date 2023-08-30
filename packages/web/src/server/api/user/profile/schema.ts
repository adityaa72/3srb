import { type TypeOf, undefined } from "zod";

const getSession = undefined();

export type Schema = {
  getSession: TypeOf<typeof getSession>;
};

const schema = {
  getSession,
};
export default schema;

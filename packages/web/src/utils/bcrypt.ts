import "@/server-only";
import bcrypt from "bcryptjs";
import { ClientError } from "./errors";

export const createHash = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const validateHash = async ({
  hash,
  password,
  error,
}: {
  password: string;
  hash: string;
  error?: string;
}) => {
  const isCorrect = await bcrypt.compare(password, hash);
  if (!isCorrect) throw ClientError(error ?? "Password is incorrect");
};

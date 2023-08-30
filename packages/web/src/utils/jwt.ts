import { env } from "@/env.mjs";
import "@/server-only";
import jwt from "jsonwebtoken";

export const createToken = ({
  payload,
  config,
}: {
  payload: Parameters<typeof jwt.sign>[0];
  config?: Parameters<typeof jwt.sign>[2];
}) =>
  jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
    ...config,
  });

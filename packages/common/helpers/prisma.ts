import { type Prisma } from "@prisma/client";

export const prismaJsonToRecord = (data: Prisma.JsonValue) => {
  if (typeof data !== "object" || Array.isArray(data)) return null;
  return data as Record<string, string>;
};

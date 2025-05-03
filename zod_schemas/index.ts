import { z, type ZodObject, type ZodRawShape } from "zod";

export function parseAndStripInvalidProperties<
  T extends ZodObject<ZodRawShape>
>(schema: T, obj: object): Partial<z.infer<T>> {
  const result = schema.safeParse(obj);

  if (result.success) return result.data;

  const invalidKeys = new Set(result.error.errors.map((e) => e.path[0]));
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !invalidKeys.has(key))
  ) as Partial<z.infer<T>>;
}

export const booleanEnum = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

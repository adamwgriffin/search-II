import * as z from "zod/mini";

export function parseAndStripInvalidProperties<T extends z.ZodMiniType>(
  schema: T,
  obj: object
) {
  const result = schema.safeParse(obj);

  if (result.success) return result.data;

  const invalidKeys = new Set(result.error.issues.map((i) => i.path[0]));
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !invalidKeys.has(key))
  ) as z.infer<T>;
}

export const booleanEnum = z.stringbool({
  truthy: ["true"],
  falsy: ["false"]
});

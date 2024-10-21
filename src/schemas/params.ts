import { z } from "@hono/zod-openapi";

export const paramsSchema = z.object({
  slug: z.string().min(1, "Slug is required").max(255),
});

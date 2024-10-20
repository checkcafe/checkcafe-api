import { z } from "@hono/zod-openapi";

export const QuerySchema = z.object({
  filter: z.string().optional(),
  sort: z.string().optional(),
  page: z.coerce.number().min(1).optional(),
  limit: z.coerce.number().min(1).optional(),
});

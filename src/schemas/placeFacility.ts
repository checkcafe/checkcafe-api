import { z } from "@hono/zod-openapi";

export const placeFacilitySchema = z.object({
  facilityId: z.string().openapi({ description: "ID of the feature." }),
  description: z
    .string()
    .optional()
    .openapi({ description: "Description of the feature." }),
});

import { z } from "@hono/zod-openapi";

export const placeFeatureSchema = z.object({
  featureId: z.string().openapi({ description: "ID of the feature." }),
  description: z
    .string()
    .optional()
    .openapi({ description: "Description of the feature." }),
});

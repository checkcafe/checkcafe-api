import { z } from "@hono/zod-openapi";

export const placePhotoSchema = z.object({
  url: z.string().openapi({ description: "The URL of the photo." }),
  order: z
    .number()
    .optional()
    .openapi({ description: "The order of the photo." }),
});

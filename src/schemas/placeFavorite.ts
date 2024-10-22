import { z } from "@hono/zod-openapi";

export const bodySchema = z.object({
  placeId: z.string().min(1, "Place ID is required").max(255).openapi({
    description: "The ID of the place to favorite.",
    example: "12345",
  }),
});

export const paramsSchema = z.object({
  placeFavoriteId: z.string().min(1, "Place ID is required").max(255).openapi({
    description: "The ID of the place to favorite.",
    example: "12345",
  }),
});

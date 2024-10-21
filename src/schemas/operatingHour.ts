import { z } from "@hono/zod-openapi";

export const operatingHourSchema = z.object({
  day: z.string().openapi({ description: "The day of the operating hour." }),
  startDateTime: z.string().openapi({
    description: "The start time of the operating hour (ISO 8601 format).",
  }),
  endDateTime: z.string().openapi({
    description: "The end time of the operating hour (ISO 8601 format).",
  }),
});

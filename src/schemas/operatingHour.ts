import { z } from "@hono/zod-openapi";

export const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const operatingHourSchema = z.object({
  day: z.string().openapi({ description: "The day of the operating hour." }),
  openingTime: z
    .string()
    .regex(timeRegex, { message: "Opening time must be in HH:mm format." })
    .openapi({
      description: "The start time of the operating hour (HH:mm format).",
    }),
  closingTime: z
    .string()
    .regex(timeRegex, { message: "Closing time must be in HH:mm format." })
    .openapi({
      description: "The end time of the operating hour (HH:mm format).",
    }),
});

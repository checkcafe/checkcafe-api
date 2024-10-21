import { z } from "@hono/zod-openapi";
import { operatingHourSchema } from "./operatingHour";
import { placeFeatureSchema } from "./placeFeature";
import { placePhotoSchema } from "./placePhoto";

export const placeSchema = z.object({
  name: z.string().min(1, "Name is required").max(255).openapi({
    description: "The name of the place.",
  }),
  description: z.string().optional().openapi({
    description: "The description of the place.",
  }),
  streetAddress: z.string().openapi({
    description: "The address of the place.",
  }),
  wifiSpeedAvg: z.number().optional().openapi({
    description: "The average wifi speed of the place.",
  }),
  priceRange: z.string().optional().openapi({
    description: "The price range of the place.",
  }),
  latitude: z.number().optional().openapi({
    description: "The latitude of the place.",
  }),
  longitude: z.number().optional().openapi({
    description: "The longitude of the place.",
  }),
  isPublished: z.boolean().optional().openapi({
    description: "The state of the place (1 = published, 0 = not published).",
  }),
  cityId: z.string().openapi({
    description: "The ID of the city of the place.",
  }),
  // Child schemas (optional)
  operatingHours: z.array(operatingHourSchema).optional().openapi({
    description: "The operating hours of the place.",
  }),
  placeFeatures: z.array(placeFeatureSchema).optional().openapi({
    description: "The features of the place.",
  }),
  placePhotos: z.array(placePhotoSchema).optional().openapi({
    description: "The photos of the place.",
  }),
});

import { z } from "@hono/zod-openapi";

import {
  UserSchema,
  PlaceSchema,
  PlaceFavoriteSchema,
  PlaceReviewSchema,
} from "../../prisma/generated/zod";

export const usernameSchema = z.object({ username: z.string() });

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255)
    .openapi({ description: "The name of the user." }),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(32, "Username cannot be longer than 32 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain alphanumeric characters or underscores"
    )
    .transform((value) => value.toLowerCase())
    .openapi({ description: "The username of the user." }),
  email: z
    .string()
    .email("Invalid email address")
    .max(128)
    .transform((value) => value.toLowerCase())
    .openapi({ description: "The email of the user." }),
  avatarUrl: z
    .string()
    .optional()
    .openapi({ description: "The avatar URL of the user." }),
});

export const userProfileSchema = z.object({
  ...UserSchema.shape,
  places: z.array(PlaceSchema),
  placeFavorites: z.array(
    z.object({ ...PlaceFavoriteSchema.shape, place: PlaceSchema })
  ),
  placeReviews: z.array(
    z.object({ ...PlaceReviewSchema.shape, place: PlaceSchema })
  ),
});

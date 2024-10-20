import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { QuerySchema } from "@/schemas/query";
import { paramsSchema } from "@/schemas/params";
import authMiddleware from "@/middlewares/auth";
import * as placeService from "@/services/place";

const placeRoute = new OpenAPIHono();
const API_TAGS = ["Places"];

// Places Route
placeRoute.openapi(
  {
    method: "post",
    path: "/",
    summary: "Post a new place",
    tags: API_TAGS,
    description: "Post a new place and get the userId.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    responses: {
      201: {
        description: "Success create a new place",
      },
      400: {
        description: "Failed to create a new place",
      },
    },
  },
  async (c: Context) => {
    const id = c.get("userId") as string;

    try {
      const places = await placeService.postPlaces(id);

      return c.json({ data: places }, 201);
    } catch (error: Error | any) {
      return c.json({ error: error.message || "Failed to create a new place!" }, 400);
    }
  },
);

// Login Route
placeRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Get all places",
    description: "Get all places.",
    tags: API_TAGS,
    request: {
        query: QuerySchema.omit({ page: true, limit: true }),
    },
    responses: {
      200: {
        description: "Places retrieved successfully",
      },
      401: {
        description: "Failed to retrieve places",
      },
    },
  },
  async (c: Context) => {
    const { filter, sort } = c.req.query();

    try {
      const result = await placeService.getPlaces(filter, sort);

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json({ error: error.message || "Failed to retrieve places" }, 401);
    }
  },
);

// Refresh Token Route
placeRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    summary: "Get places by slug",
    description: "Get places by slug.",
    tags: API_TAGS,
    request: {
      params: paramsSchema
    },
    responses: {
      200: {
        description: "Succes get places by slug",
      },
      401: {
        description: "Slug not found",
      },
    },
  },
  async (c: Context) => {
    const { slug } = c.req.param();

    if (!slug) {
      return c.json({ error: "Slug is required!" }, 401);
    }

    try {
      const place = await placeService.getPlaceBySlug(slug);

      return c.json(place, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to get place by slug!" },
        401,
      );
    }
  },
);

export default placeRoute;

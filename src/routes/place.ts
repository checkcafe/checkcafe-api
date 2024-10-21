import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { querySchema } from "@/schemas/query";
import { paramsSchema } from "@/schemas/params";
import authMiddleware from "@/middlewares/auth";
import * as placeService from "@/services/place";
import * as placeSchema from "@/schemas/place";

const placeRoute = new OpenAPIHono();
const API_TAGS = ["Places"];

// Create Places Route
placeRoute.openapi(
  {
    method: "post",
    path: "/",
    summary: "Create a new place",
    description:
      "This operation is used to create a new place. The user must be authenticated.",
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
    tags: API_TAGS,
  },
  async (c: Context) => {
    const userId = c.get("user") ? c.get("user").id : null;

    try {
      const places = await placeService.postPlaces(userId);

      return c.json({ data: places }, 201);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to create a new place!" },
        400
      );
    }
  }
);

// Get Places Route
placeRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Place list",
    description: "Get a list of places.",
    request: {
      query: querySchema.omit({ page: true, limit: true }),
    },
    responses: {
      200: {
        description: "Places retrieved successfully",
      },
      401: {
        description: "Failed to retrieve places",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const { filter, sort } = c.req.query();

    try {
      const result = await placeService.getPlaces(filter, sort);

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to retrieve places" },
        401
      );
    }
  }
);

// Get Place Route by slug
placeRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    summary: "Places details",
    description: "Get a place by slug.",
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: "Succes get places by slug",
      },
      401: {
        description: "Slug not found",
      },
    },
    tags: API_TAGS,
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
        401
      );
    }
  }
);

// Update Place Route
placeRoute.openapi(
  {
    method: "patch",
    path: "/{placeId}",
    summary: "Update a place",
    description:
      "This operation is used to update a place. The user must be authenticated.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      body: {
        content: {
          "application/json": {
            schema: placeSchema.placeSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Place patched successfully",
      },
      401: {
        description: "Unauthorized",
      },
      404: {
        description: "Place not found",
      },
      500: {
        description: "Failed to patch place",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const { placeId } = c.req.param();

    if (!placeId) {
      return c.json({ error: "Place ID is required!" }, 401);
    }

    const user = c.get("user");
    const body = await c.req.json();
    
    try {
      const result = await placeService.patchPlace(user, placeId, body);

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message }, 500);
    }
  }
);

export default placeRoute;

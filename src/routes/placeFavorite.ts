import * as placeFavoriteService from "@/services/placeFavorite";
import { OpenAPIHono } from "@hono/zod-openapi";
import authMiddleware from "@/middlewares/auth";
import { Context } from "hono";
import { bodySchema } from "@/schemas/placeFavorite";
import { paramsSchema } from "@/schemas/placeFavorite";

const placeFavoriteRoute = new OpenAPIHono();
const API_TAGS = ["Favorite Places"];

// Places Route
placeFavoriteRoute.openapi(
  {
    method: "post",
    path: "/",
    summary: "Create favorite place",
    tags: API_TAGS,
    description: "Create favorite place.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      body: {
        content: {
          "application/json": {
            schema: bodySchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Success create favorite place",
      },
      400: {
        description: "Failed to create favorite place",
      },
    },
  },
  async (c) => {
    const { placeId } = c.req.valid("json");
    const userId = (c as Context).get("userId");

    try {
      const place = await placeFavoriteService.createPlaceFavorite(
        userId,
        placeId
      );
      return c.json(place, 201);
    } catch (error: Error | any) {
      return c.json({ error: error.message }, 400);
    }
  }
);

// Get list of favorite places
placeFavoriteRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "List of favorite places",
    tags: API_TAGS,
    description: "Get all favorite places by user.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
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
    const userId = c.get("userId") as string;

    try {
      const listPlaces = await placeFavoriteService.getListPlaceFavorites(
        userId
      );
      return c.json(listPlaces, 200);
    } catch (error: Error | any) {
      return c.json({ error: error.message }, 400);
    }
  }
);

// Delete favorite place
placeFavoriteRoute.openapi(
  {
    method: "delete",
    path: "/{id}",
    summary: "Delete favorite place",
    tags: API_TAGS,
    description: "Delete favorite place.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: "Place deleted successfully",
      },
      401: {
        description: "Failed to delete place",
      },
    },
  },
  async (c) => {
    const { placeFavoriteId } = c.req.valid("param");

    try {
      const place = await placeFavoriteService.deletePlaceFavorite(
        placeFavoriteId
      );
      return c.json(place, 200);
    } catch (error: Error | any) {
      return c.json({ error: error.message }, 400);
    }
  }
);

export default placeFavoriteRoute;

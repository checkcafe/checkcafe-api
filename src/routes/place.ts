import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { querySchema } from "@/schemas/query";
import { placeSchema } from "@/schemas/place";
import authMiddleware from "@/middlewares/auth";
import * as placeService from "@/services/place";

const placeRoute = new OpenAPIHono();
const API_TAGS = ["Places"];

// Get Places Route
placeRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Places",
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
  async (c) => {
    const { filter, sort } = c.req.valid("query");

    let filterObj = filter ? JSON.parse(filter) : {};
    filterObj = { isPublished: true, ...filterObj };

    try {
      const result = await placeService.getPlaces(
        JSON.stringify(filterObj),
        sort
      );

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to retrieve places" },
        401
      );
    }
  }
);

// Get Place Route
placeRoute.openapi(
  {
    method: "get",
    path: "/{slug}",
    summary: "Place details",
    description: "Get a place by slug.",
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
  async (c) => {
    const slug = c.req.param("slug");
    if (!slug) {
      return c.json({ error: "Slug not found" }, 401);
    }

    try {
      const place = await placeService.getPlaceBySlug(slug);
      return c.json(place, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to get place by slug!" },
        500
      );
    }
  }
);

// Post Places Route
placeRoute.openapi(
  {
    method: "post",
    path: "/",
    summary: "Create a place",
    description:
      "This operation is used to create a new place. The user must be authenticated.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      body: {
        content: {
          "application/json": {
            schema: placeSchema.omit({ id: true }),
          },
        },
      },
    },
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
            schema: placeSchema.omit({ id: true }),
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
  async (c) => {
    const body = c.req.valid("json");
    const user = (c as Context).get("user");

    const id = c.req.param("placeId");
    if (!id) {
      return c.json({ message: "Place not found" }, 404);
    }

    try {
      const result = await placeService.patchPlace(user, id, body);

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message }, 500);
    }
  }
);

// Delete Place Route
placeRoute.openapi(
  {
    method: "delete",
    path: "/{placeId}",
    summary: "Delete a place",
    description:
      "This operation is used to delete a place. The user must be authenticated.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    responses: {
      200: {
        description: "Place deleted successfully",
      },
      401: {
        description: "Unauthorized",
      },
      404: {
        description: "Place not found",
      },
      500: {
        description: "Failed to delete place",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const user = (c as Context).get("user");

    const id = c.req.param("placeId");
    if (!id) {
      return c.json({ message: "Place not found" }, 404);
    }

    try {
      await placeService.deletePlace(id, user);

      return c.json({ message: "Success delete place" }, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message }, 500);
    }
  }
);

export default placeRoute;

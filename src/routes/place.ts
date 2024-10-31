import type { Context } from "hono";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { querySchema } from "@/schemas/query";
import { placeIdSchema, placeSchema } from "@/schemas/place";
import authMiddleware from "@/middlewares/auth";
import * as placeService from "@/services/place";

const placeRoute = new OpenAPIHono();
const API_TAGS = ["Places"];

// Get All Places Route
placeRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Places",
    description: "Get a list of places.",
    request: {
      query: querySchema,
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
    const { filter, sort, limit, page } = c.req.valid("query");

    let filterObj = filter ? JSON.parse(filter) : {};
    filterObj = { isPublished: true, ...filterObj };

    try {
      const result = await placeService.getPlaces(
        JSON.stringify(filterObj),
        sort,
        limit,
        page
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

// Get One Place Route
placeRoute.openapi(
  {
    method: "get",
    path: "/{slugOrId}",
    summary: "Place details",
    description: "Get a place by slug or id.",
    request: { params: z.object({ slugOrId: z.string() }) },
    responses: {
      200: {
        description: "Succes get places by slug or id",
      },
      401: {
        description: "Place not found",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const { slugOrId } = c.req.valid("param");

    try {
      const place = await placeService.getPlaceBySlugOrId(slugOrId);

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
      const result = await placeService.postPlaces(userId);

      return c.json(result, 201);
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
      params: placeIdSchema,
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
    const { id } = c.req.valid("param");

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
    request: {
      params: placeIdSchema,
    },
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
    const { id } = c.req.valid("param");

    try {
      await placeService.deletePlace(id, user);

      return c.json({ message: "Success delete place" }, 200);
    } catch (error: Error | any) {
      return c.json({ message: error.message }, 500);
    }
  }
);

export default placeRoute;

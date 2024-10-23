import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { querySchema } from "@/schemas/query";
import * as userService from "@/services/user";
import * as placeService from "@/services/place";
import * as placeFavoriteService from "@/services/placeFavorite";
import * as placeSchema from "@/schemas/place";
import authMiddleware from "@/middlewares/auth";

const userRoute = new OpenAPIHono();
const API_TAGS = ["User"];

// Get Users Route
userRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "Users",
    description: "Get a list of users.",
    request: {
      query: querySchema.omit({ page: true, limit: true }),
    },
    responses: {
      200: {
        description: "Users retrieved successfully",
      },
      404: {
        description: "Users not found",
      },
      500: {
        description: "Failed to retrieve users",
      },
    },
    tags: API_TAGS,
  },
  async (c: Context) => {
    const { filter, sort } = c.req.query();

    try {
      const result = await userService.getUsers(filter, sort);

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json({ error: error.message || "Failed to get user!" }, 401);
    }
  }
);

// Get User Profile Route
userRoute.openapi(
  {
    method: "get",
    path: "/{username}",
    summary: "User profile",
    description: "Get user information including user ID, username, and role.",
    responses: {
      200: {
        description: "User information successfully retrieved",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const username = c.req.param("username");

    try {
      const user = await userService.getUser(undefined, username);

      const result = {
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role?.name || null,
      };

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json({ error: error.message || "Failed to get user!" }, 401);
    }
  }
);

// Get User Places Route
userRoute.openapi(
  {
    method: "get",
    path: "/{username}/places",
    summary: "User places",
    description: "Get places by user.",
    request: {
      query: querySchema.omit({ page: true, limit: true }),
    },
    responses: {
      200: {
        description: "Places retrieved successfully",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const { filter, sort } = c.req.valid("query");
    const username = c.req.param("username");

    if (!username) {
      return c.json({ error: "Username is required!" }, 401);
    }

    let filterObj = filter ? JSON.parse(filter) : {};
    filterObj = { "user.username": username, ...filterObj };

    try {
      const places = await placeService.getPlaces(filter, sort);

      return c.json(places, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to get user places!" },
        401
      );
    }
  }
);

// Get User Favorite Route
userRoute.openapi(
  {
    method: "get",
    path: "/{username}/favorite",
    summary: "User favorite places",
    description: "Get favorite places by user.",
    responses: {
      200: {
        description: "Places retrieved successfully",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const username = c.req.param("username");

    if (!username) {
      return c.json({ error: "Username is required!" }, 401);
    }

    try {
      const favorites = await placeFavoriteService.getFavorites(username);

      return c.json(favorites, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to get user favorite place!" },
        401
      );
    }
  }
);

// Post User Favorite Route
userRoute.openapi(
  {
    method: "post",
    path: "/{username}/favorite",
    summary: "User favorite place",
    description: "Get favorite places by user.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      body: {
        content: {
          "application/json": {
            schema: placeSchema.placeIdSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Places retrieved successfully",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const userId = (c as Context).get("user")?.id as string;
    const username = c.req.param("username");
    const { id } = c.req.valid("json");

    if (!username) {
      return c.json({ error: "Username is required!" }, 401);
    }

    try {
      const [favorites] = await Promise.all([
        await userService.getUser(userId, username),
        await placeFavoriteService.createFavorite(userId, id),
      ]);

      return c.json(favorites, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to create user favorite place!" },
        401
      );
    }
  }
);

// Delete User Favorite Route
userRoute.openapi(
  {
    method: "delete",
    path: "/{username}/favorite/{id}",
    summary: "User favorite place",
    description: "Get favorite places by user.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      body: {
        content: {
          "application/json": {
            schema: placeSchema.placeIdSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Places retrieved successfully",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const userId = (c as Context).get("user")?.id as string;
    const username = c.req.param("username");
    const { id } = c.req.valid("json");

    if (!username) {
      return c.json({ error: "Username is required!" }, 401);
    }

    try {
      const [favorites] = await Promise.all([
        await userService.getUser(userId, username),
        await placeFavoriteService.deleteFavorite(id, userId),
      ]);

      return c.json(favorites, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to delete user favorite place!" },
        401
      );
    }
  }
);

export default userRoute;

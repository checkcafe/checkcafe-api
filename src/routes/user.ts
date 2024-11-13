import type { Context } from "hono";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { querySchema } from "@/schemas/query";
import {
  usernameSchema,
  createUserSchema,
  userProfileSchema,
} from "@/schemas/user";
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
      return c.json(
        { error: error.message || "Failed to get user!" },
        error.status || 401
      );
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
    request: {
      params: usernameSchema,
    },
    responses: {
      200: {
        description: "User information successfully retrieved",
        content: {
          "application/json": { schema: userProfileSchema },
        },
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const { username } = c.req.valid("param");

    try {
      const user = await userService.getUser(username);

      return c.json(user, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to get user!" },
        error.status || 401
      );
    }
  }
);

// Put User Profile Route
userRoute.openapi(
  {
    method: "put",
    path: "/{username}",
    summary: "User profile",
    description: "Update user information.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      params: usernameSchema,
      body: {
        content: {
          "application/json": {
            schema: createUserSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "User information successfully updated",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const { username } = c.req.valid("param");
    const userId = (c as Context).get("user")?.id as string;
    const body = c.req.valid("json");

    try {
      const [user, updatedUser] = await Promise.all([
        await userService.getUser(username),
        await userService.updateUser(userId, body),
      ]);

      if (!user || user.id !== userId) {
        return c.json({ error: "User not found!" }, 401);
      }

      return c.json(updatedUser, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to update user!" },
        error.status || 401
      );
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
      query: querySchema,
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
    const { filter, sort, limit, page } = c.req.valid("query");
    const username = c.req.param("username");

    if (!username) {
      return c.json({ error: "Username is required!" }, 401);
    }

    let filterObj = filter ? JSON.parse(filter) : {};
    filterObj = {
      isPublished: true,
      "user.username": username,
      ...filterObj,
    };

    let sortObj = sort ? JSON.parse(sort) : {};
    sortObj = {
      createdAt: "desc",
      ...sortObj,
    };

    try {
      const places = await placeService.getPlaces(
        JSON.stringify(filterObj),
        JSON.stringify(sortObj),
        limit,
        page
      );

      return c.json(places, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to get user places!" },
        error.status || 401
      );
    }
  }
);

// Get User Favorite Route
userRoute.openapi(
  {
    method: "get",
    path: "/{username}/favorites",
    summary: "User favorite places",
    description: "Get favorite places by user.",
    request: {
      params: usernameSchema,
      query: querySchema,
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
    const { username } = c.req.valid("param");
    const { filter, sort, limit, page } = c.req.valid("query");

    if (!username) {
      return c.json({ error: "Username is required!" }, 401);
    }

    let filterObj = filter ? JSON.parse(filter) : {};
    filterObj = {
      "place.isPublished": true,
      "user.username": username,
      ...filterObj,
    };

    let sortObj = sort ? JSON.parse(sort) : {};
    sortObj = {
      createdAt: "desc",
      ...sortObj,
    };

    try {
      const favorites = await placeFavoriteService.getFavorites(
        JSON.stringify(filterObj),
        JSON.stringify(sortObj),
        limit,
        page
      );

      return c.json(favorites, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to get user favorite place!" },
        error.status || 401
      );
    }
  }
);

// Get User Dashboard Place Route
userRoute.openapi(
  {
    method: "get",
    path: "/{username}/dashboard",
    summary: "User dashboard places",
    description: "Get dashboard places by user.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
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
    // TODO: Get dashboard places by user id (without filter isPublished)
  }
);

// Post User Favorite Route
userRoute.openapi(
  {
    method: "post",
    path: "/{username}/favorites",
    summary: "User favorite place",
    description: "Get favorite places by user.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      params: usernameSchema,
      body: {
        content: { "application/json": { schema: placeSchema.placeIdSchema } },
      },
    },
    responses: {
      200: { description: "Places retrieved successfully" },
      401: { description: "Refresh token is missing or invalid" },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const userId = (c as Context).get("user")?.id as string;
    const { id: placeId } = c.req.valid("json");

    try {
      const favoritePlace = await placeFavoriteService.upsertFavorite(
        userId,
        placeId
      );

      return c.json(favoritePlace, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to create user favorite place!" },
        error.status || 401
      );
    }
  }
);

// Delete User Favorite Route
userRoute.openapi(
  {
    method: "delete",
    path: "/{username}/favorites/{placeFavoriteId}",
    summary: "User unfavorite place",
    description: "Unfavorite place.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      params: usernameSchema.extend({ placeFavoriteId: z.string() }),
    },
    responses: {
      200: { description: "Unfavorited place" },
      401: { description: "Refresh token is missing or invalid" },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const userId = (c as Context).get("user")?.id as string;
    const { placeFavoriteId } = c.req.valid("param");

    try {
      const result = placeFavoriteService.deleteFavorite(
        userId,
        placeFavoriteId
      );

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to unfavorite place!" },
        error.status || 401
      );
    }
  }
);

export default userRoute;

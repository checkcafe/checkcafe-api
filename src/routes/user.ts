import type { Context } from "hono";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { querySchema } from "@/schemas/query";
import { userSchema } from "@/schemas/user";
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
      const protocol = c.req.header("X-Forwarded-Proto") || "http";
      const host = c.req.header("host");
      const baseUrl = `${protocol}://${host}`;

      const result = {
        ...user,
        placesUrl: `${baseUrl}/users/${user.username}/places`,
        favoritesUrl: `${baseUrl}/users/${user.username}/favorites`,
        role: user.role?.name || null,
      };

      return c.json(result, 200);
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
      body: {
        content: {
          "application/json": {
            schema: userSchema,
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
    const username = c.req.param("username");
    const userId = (c as Context).get("user")?.id as string;
    const body = c.req.valid("json");

    try {
      const [user, updatedUser] = await Promise.all([
        await userService.getUser(userId, username),
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
      params: z.object({ username: z.string() }),
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
      const [user, favorites] = await Promise.all([
        await userService.getUser(userId, username),
        await placeFavoriteService.createFavorite(userId, id),
      ]);

      if (!user || user.id !== userId) {
        return c.json({ error: "User not found!" }, 401);
      }

      return c.json(favorites, 200);
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
    path: "/{username}/favorites/{id}",
    summary: "User favorite place",
    description: "Get favorite places by user.",
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
    const userId = (c as Context).get("user")?.id as string;
    const username = c.req.param("username");
    const id = c.req.param("id");

    if (!id || !username) {
      return c.json({ error: "Id and username are required!" }, 401);
    }

    try {
      const [user, favorites] = await Promise.all([
        await userService.getUser(userId, username),
        await placeFavoriteService.deleteFavorite(userId, id),
      ]);

      if (!user || user.id !== userId) {
        return c.json({ error: "User not found!" }, 401);
      }

      return c.json(favorites, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to delete user favorite place!" },
        error.status || 401
      );
    }
  }
);

export default userRoute;

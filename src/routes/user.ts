import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import * as userService from "@/services/user";
import authMiddleware from "@/middlewares/auth";
import { querySchema } from "@/schemas/query";

const userRoute = new OpenAPIHono();
const API_TAGS = ["User"];

// Users Route
userRoute.openapi(
  {
    method: "get",
    path: "/",
    summary: "User list",
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

// Profile Route
userRoute.openapi(
  {
    method: "get",
    path: "/me",
    summary: "User profile",
    description: "Get user information including user ID, username, and role.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
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
  async (c: Context) => {
    const userId = c.get("user") ? c.get("user").id : null;
    
    try {
      const user = await userService.getProfile(userId);

      return c.json(user, 200);
    } catch (error: Error | any) {
      return c.json({ error: error.message || "Failed to get user!" }, 401);
    }
  }
);

export default userRoute;

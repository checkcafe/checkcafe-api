import type { Context } from "hono";
import { OpenAPIHono } from "@hono/zod-openapi";
import { getMe, getUser } from "@/services/user";
import * as authService from "@/services/auth";
import * as authSchema from "@/schemas/auth";
import authMiddleware from "@/middlewares/auth";

const authRoute = new OpenAPIHono();
const API_TAGS = ["Auth"];

// Register Component
authRoute.openAPIRegistry.registerComponent(
  "securitySchemes",
  "AuthorizationBearer",
  {
    type: "http",
    scheme: "bearer",
    in: "header",
    description: "Bearer token",
  }
);

// Register Route
authRoute.openapi(
  {
    method: "post",
    path: "/register",
    summary: "Register a new user",
    description:
      "Register a new user with name, email, password, and confirm password.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.registerSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "User successfully registered",
      },
      400: {
        description: "Invalid input or registration failed",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const body = c.req.valid("json");

    try {
      const appendBody = {
        ...body,
        avatarUrl:
          body.avatarUrl ??
          `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${body.username}&size=64`,
      };

      const user = await authService.register(appendBody);

      return c.json(user, 201);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Registration failed!" },
        error.status || 400
      );
    }
  }
);

// Login Route
authRoute.openapi(
  {
    method: "post",
    path: "/login",
    summary: "Log in a user",
    description: "Log in a user with email and password.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.loginSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Login successful",
      },
      401: {
        description: "Invalid email or password",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const body = c.req.valid("json");

    try {
      const result = await authService.login(body);

      return c.json(result, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Login failed!" },
        error.status || 401
      );
    }
  }
);

// Auth Me Router
authRoute.openapi(
  {
    method: "get",
    path: "/me",
    summary: "User information",
    description:
      "Get logged in user information including user ID, username, and role.",
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
  async (c) => {
    const userId = (c as Context).get("user")?.id as string;

    try {
      const user = await getMe(userId);

      return c.json(user, 200);
    } catch (error: Error | any) {
      return c.json({ error: error.message }, error.status || 401);
    }
  }
);

// Change Password Route
authRoute.openapi(
  {
    method: "put",
    path: "/change-password",
    summary: "Change password",
    description: "Change user password.",
    security: [{ AuthorizationBearer: [] }],
    middleware: [authMiddleware],
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.changePasswordSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Password successfully changed",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const { oldPassword, newPassword } = c.req.valid("json");
    const userId = (c as Context).get("user")?.id as string;

    try {
      await authService.changePassword(userId, oldPassword, newPassword);

      return c.json({ message: "Password successfully changed!" }, 200);
    } catch (error: Error | any) {
      return c.json({ error: error.message }, error.status || 401);
    }
  }
);

// Refresh Token Route
authRoute.openapi(
  {
    method: "post",
    path: "/refresh-token",
    summary: "Refresh access token",
    description: "Refresh the access token using the refresh token.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.refreshSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Token successfully refreshed",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const { refreshToken } = c.req.valid("json");

    try {
      const token = await authService.regenToken(refreshToken);

      return c.json(token, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to refresh token!" },
        error.status || 401
      );
    }
  }
);

// Logout Route
authRoute.openapi(
  {
    method: "post",
    path: "/logout",
    summary: "Log out a user",
    description: "Log out a user by invalidating the refresh token.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: authSchema.refreshSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Logout successful",
      },
      401: {
        description: "Refresh token is missing or invalid",
      },
      500: {
        description: "Failed to log out",
      },
    },
    tags: API_TAGS,
  },
  async (c) => {
    const { refreshToken } = c.req.valid("json");

    try {
      await authService.logout(refreshToken);

      return c.json({ message: "Logout successful!" }, 200);
    } catch (error: Error | any) {
      return c.json(
        { error: error.message || "Failed to logout!" },
        error.status || 500
      );
    }
  }
);

export default authRoute;

import { Context } from "hono";
import { createMiddleware } from "hono/factory";
import { validateToken } from "@/libs/jwt";
import db from "@/libs/db";

const authMiddleware = createMiddleware(async (c: Context, next) => {
  const token = extractToken(c.req.header("Authorization"));

  if (!token) {
    return respondWithError(c, "Authorization token is required!", 401);
  }

  try {
    const decodedToken = await validateToken(token);
    const userId = decodedToken?.subject;

    if (!userId || typeof userId !== "string" || userId.length === 0) {
      return respondWithError(c, "Invalid user ID in token!", 401);
    }

    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      return respondWithError(c, "User not found!", 404);
    }

    c.set("userId", user.id);
    c.set("userRole", user.role.name);

    await next();
  } catch (error) {
    return respondWithError(c, "Authentication failed", 401);
  }
});

const extractToken = (authHeader: string | undefined): string | null => {
  return authHeader ? authHeader.split(" ")[1] : null;
};

const respondWithError = (c: Context, message: string, status: number) => {
  return c.json({ message }, { status });
};

export default authMiddleware;

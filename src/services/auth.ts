import { z } from "@hono/zod-openapi";
import { registerSchema, loginSchema } from "@/schemas/auth";
import { passwordHash, passwordVerify } from "@/libs/password";
import db from "@/libs/db";
import * as jwt from "@/libs/jwt";

/**
 * Registers a new user.
 *
 * @param data The user data to register.
 * @returns The registered user.
 * @throws {Error} If the email is already in use.
 */
export const register = async (data: z.infer<typeof registerSchema>) => {
  return await db.$transaction(async (prisma) => {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      throw new Error("Email or Username already registered!");
    }

    let role = await prisma.role.findUnique({
      where: { name: "USER" },
      select: { id: true },
    });

    if (!role) {
      role = await prisma.role.create({
        data: { name: "USER" },
      });
    }

    const hashedPassword = await passwordHash(data.password);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        avatarUrl: data.avatarUrl,
        roleId: role.id,
      },
    });

    return {
      name: user.name,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
    };
  });
};

/**
 * Logs in a user and returns JWT access and refresh tokens.
 *
 * @param data The login data (email/username and password).
 * @returns The generated access and refresh tokens.
 * @throws {Error} If the credentials are invalid.
 */
export const login = async (data: z.infer<typeof loginSchema>) => {
  const { username, password: inputPassword } = loginSchema.parse(data);
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username);

  const user = await db.user.findUnique({
    select: { id: true, password: true, role: { select: { name: true } } },
    where: isEmail ? { email: username } : { username: username },
  });

  if (!user || !(await passwordVerify(inputPassword, user.password))) {
    throw new Error("Username or password is incorrect");
  }

  const [accessToken, refreshToken] = await Promise.all([
    jwt.createAccessToken(user.id),
    jwt.createRefreshToken(user.id),
  ]);

  return { accessToken, refreshToken, role: user.role.name || null };
};

/**
 * Changes a user's password. This function verifies the old password before
 * updating the user's password to the new one. If the old password is incorrect,
 * an error is thrown.
 *
 * @param userId The ID of the user whose password should be changed.
 * @param oldPassword The old password to verify against.
 * @param newPassword The new password to set.
 * @returns The updated user.
 * @throws {Error} If the old password is incorrect or the user is not found.
 */
export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  if (!(await passwordVerify(oldPassword, user.password))) {
    throw new Error("Old password is incorrect");
  }

  return await db.user.update({
    where: { id: userId },
    data: { password: await passwordHash(newPassword) },
  });
};

/**
 * Processes a refresh token by either revoking it or regenerating a new token pair.
 *
 * @param refreshToken The refresh token to process.
 * @param action The action to take on the token. If "REVOKE", the token is revoked.
 * If "REGENERATE", a new token pair is generated and returned.
 * @returns If action is "REVOKE", returns a boolean indicating success. If action is
 * "REGENERATE", returns an object with the new access and refresh tokens.
 * @throws {Error} If the token is invalid or expired.
 */
const processToken = async (
  refreshToken: string,
  action: "REVOKE" | "REGENERATE",
  timeoutDuration: number = 10000
) => {
  const decodedToken = await jwt.validateToken(refreshToken);
  if (!decodedToken?.subject) {
    throw new Error("Invalid or expired refresh token");
  }

  const userId = decodedToken.subject;

  const withTimeout = <T>(
    promise: Promise<T>,
    duration: number
  ): Promise<T> => {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error("Operation timed out")), duration)
      ),
    ]);
  };

  return await db.$transaction(async (prisma) => {
    const tokenRecords = await withTimeout(
      prisma.userToken.findMany({
        where: {
          userId,
          revoked: false,
          expiresAt: { gte: new Date() },
        },
      }),
      timeoutDuration
    );

    const validTokenRecord = await Promise.all(
      tokenRecords.map(async (tokenRecord) => {
        const isValidToken = await passwordVerify(
          refreshToken,
          tokenRecord.token
        );
        return isValidToken ? tokenRecord : null;
      })
    ).then((results) => results.find((record) => record !== null));

    if (!validTokenRecord) {
      throw new Error("Refresh token is invalid or already revoked!");
    }

    await prisma.userToken.update({
      where: { id: validTokenRecord.id },
      data: { revoked: true },
    });

    await prisma.userToken.deleteMany({
      where: {
        userId,
        OR: [
          {
            expiresAt: { lt: new Date() },
          },
          {
            revoked: true,
          },
        ],
      },
    });

    if (action === "REGENERATE") {
      const [newAccessToken, newRefreshToken] = await Promise.all([
        jwt.createAccessToken(userId.toString()),
        jwt.createRefreshToken(userId.toString()),
      ]);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    }

    return true;
  });
};

/**
 * Regenerates a new access and refresh token pair for the given refresh token.
 * @param refreshToken The refresh token to use for regenerating the tokens.
 * @returns The new access and refresh token pair as an object with `accessToken` and `refreshToken` properties.
 */
export const regenToken = async (refreshToken: string): Promise<any> => {
  return await processToken(refreshToken, "REGENERATE");
};

/**
 * Logs out a user by invalidating their refresh token.
 *
 * @param refreshToken The refresh token to revoke.
 * @returns A boolean indicating success.
 */
export const logout = async (refreshToken: string) => {
  return await processToken(refreshToken, "REVOKE");
};

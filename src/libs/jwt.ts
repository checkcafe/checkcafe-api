import { passwordHash } from "@/libs/password";
import { createJWT, validateJWT } from "oslo/jwt";
import { TimeSpan } from "oslo";
import db from "@/libs/db";

const SECRET_KEY = process.env.JWT_SECRET || "secret";
/**
 * Gets the secret token as an encoded ArrayBuffer.
 * @throws {Error} If the secret token is not defined.
 */
const getEncodedSecret = async (): Promise<ArrayBuffer> => {
  if (!SECRET_KEY) throw new Error("Secret token is not defined");

  return new TextEncoder().encode(SECRET_KEY).buffer as ArrayBuffer;
};

/**
 * Creates a JWT token with the specified parameters.
 * @param userId The user ID to include in the token.
 * @param expiresIn The expiration time as a TimeSpan object.
 * @returns The created JWT token.
 * @throws {Error} If token creation fails.
 */
const createToken = async (
  userId: string,
  expiresIn: TimeSpan
): Promise<string> => {
  const secret = await getEncodedSecret();
  const options = {
    subject: userId,
    expiresIn,
    includeIssuedTimestamp: true,
  };

  return await createJWT("HS256", secret, {}, options);
};

/**
 * Creates an access JWT token with a short expiration time.
 * @param userId The user ID to include in the token.
 * @param expiresInMinutes The number of minutes until the token expires.
 * @returns The created JWT token.
 * @throws {Error} If token creation fails.
 */
export const createAccessToken = async (
  userId: string,
  expiresInMinutes = 15
): Promise<string> => {
  try {
    return await createToken(userId, new TimeSpan(expiresInMinutes, "m"));
  } catch (error) {
    throw new Error("Failed to create access token.", { cause: error });
  }
};

/**
 * Validates a given JWT token against the secret token.
 * @param token The token to validate.
 * @returns The result of the validation.
 * @throws {Error} If token validation fails.
 */
export const validateToken = async (token: string): Promise<any> => {
  try {
    const secret = await getEncodedSecret();
    return await validateJWT("HS256", secret, token);
  } catch (error) {
    throw new Error("Failed to validate token.", { cause: error });
  }
};

/**
 * Creates a refresh JWT token with a longer expiration time and saves it to the database.
 * @param userId The user ID to create a refresh token for.
 * @param expiresInDays The number of days until the refresh token expires.
 * @returns The created refresh token.
 * @throws {Error} If token creation fails.
 */
export const createRefreshToken = async (
  userId: string,
  expiresInDays: number = 14
): Promise<string> => {
  try {
    const issuedAt = new Date();
    const expiresAt = new Date(
      issuedAt.getTime() + expiresInDays * 24 * 60 * 60 * 1000
    );
    const tokenExpiry = new TimeSpan(expiresInDays, "d");

    const refreshToken = await createToken(userId, tokenExpiry);

    await db.userToken.create({
      data: {
        userId,
        token: refreshToken,
        issuedAt,
        expiresAt,
      },
    });

    return refreshToken;
  } catch (error) {
    throw new Error("Failed to create refresh token.", { cause: error });
  }
};

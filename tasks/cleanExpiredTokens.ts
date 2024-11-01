import db from "../src/libs/db";

/**
 * Deletes all expired user tokens from the database.
 * @returns {Promise<void>} A promise that resolves when the deletion has completed.
 */
export const cleanExpiredTokens = async (): Promise<void> => {
  try {
    const result = await db.userToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
    console.log(`Deleted ${result.count} expired tokens.`);
  } catch (error) {
    console.error("Error deleting expired tokens:", error);
  }
};

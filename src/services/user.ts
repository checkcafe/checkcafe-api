import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";

/**
 * Retrieves a list of users from the database.
 *
 * @returns An array of user objects.
 * @throws {Error} If no users are found.
 */
export const getUsers = async (queryFilter?: string, querySort?: string) => {
  const where = parseFilters(queryFilter);
  const orderBy = parseSorts(querySort);

  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
    },
    where,
    orderBy,
  });

  if (!users) {
    throw new Error("Users not found");
  }

  return users;
};

/**
 * Retrieves the profile of a user by ID.
 *
 * @param userId The ID of the user to retrieve.
 * @param username The username of the user to retrieve.
 * @returns The user profile.
 * @throws {Error} If the user does not exist.
 */
export const getUser = async (userId?: string, username?: string) => {
  const user = await db.user.findUnique({
    where: { id: userId || undefined, username: username || undefined },
    include: {
      role: true,
      places: true,
      PlaceFavorite: true,
      placeReviews: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Updates a user in the database with the given data.
 *
 * @param userId The ID of the user to update.
 * @param body The data to update the user with.
 * @returns The updated user.
 * @throws {Error} If the user does not exist.
 */
export const updateUser = async (userId: string, body: any) => {
  const user = await db.user.update({
    where: { id: userId },
    data: body,
  });

  return user;
};

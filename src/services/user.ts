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
 * @returns The user profile.
 * @throws {Error} If the user does not exist.
 */
export const getProfile = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      username: true,
      email: true,
      role: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role?.name || null,
  };
};

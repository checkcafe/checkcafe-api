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

// Todo : Get dashboard by username without isPublish filter
export const getUserDashboard = async (userId: string, userName: string) => {
  const places = await db.place.findMany({
    where: {
      userId,
      user: {
        username: userName
      }
    },
    include: {
      user: true
    }
  });

  if (!places) {
    throw new Error("Place not found")
  }

  return places;
}

/**
 * Retrieves the profile of the currently authenticated user by ID.
 *
 * @param userId The ID of the user to retrieve.
 * @returns The user profile, including id, name, email, username, avatar URL, role, and creation date.
 * @throws {Error} If the user is not found.
 */
export const getMe = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      avatarUrl: true,
      role: { select: { name: true } },
      createdAt: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Retrieves a user's profile by username.
 *
 * @param username The username of the user to retrieve.
 * @returns The user profile, including id, name, email, username, avatar URL, creation date, places, favorite places, and place reviews.
 * @throws {Error} If the user is not found.
 */
export const getUser = async (username: string) => {
  const user = await db.user.findUnique({
    where: { username, places: {} },
    include: {
      places: { where: { isPublished: true } },
      placeFavorites: { include: { place: true } },
      placeReviews: { include: { place: true } },
    },
    omit: {
      password: true,
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

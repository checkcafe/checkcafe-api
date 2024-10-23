import db from "@/libs/db";
import parseSorts from "@/utils/sort";

/**
 * Retrieves a list of favorite records for a given user ID, with optional sorting.
 *
 * @param userId The ID of the user whose favorite records to retrieve.
 * @param querySort Optional query string parameter for sorting the results.
 * @returns A list of favorite records, with their associated places and users.
 */
export const getFavorites = async (userId: string, querySort?: string) => {
  const orderBy = parseSorts(querySort);

  const placeFavorites = await db.placeFavorite.findMany({
    where: { userId },
    include: {
      place: true,
      user: true,
    },
    orderBy,
  });

  return placeFavorites;
};

/**
 * Creates a new favorite record in the database for the given user and place.
 *
 * @param placeId The ID of the place to favorite.
 * @param userId The ID of the user favoriting the place.
 * @returns The newly created favorite record.
 */
export const createFavorite = async (placeId: string, userId: string) => {
  const placeFavorite = await db.placeFavorite.create({
    data: {
      userId,
      placeId,
    },
  });
  return placeFavorite;
};

/**
 * Deletes a favorite record from the database for the given user and place ID.
 *
 * @param id The ID of the favorite record to delete.
 * @param userId The ID of the user who owns the favorite record.
 * @returns The deleted favorite record.
 */
export const deleteFavorite = async (id: string, userId: string) => {
  const placeFavorite = await db.placeFavorite.delete({
    where: { id, userId },
  });

  return placeFavorite;
};

import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";

/**
 * Creates a new place favorite and returns it.
 *
 * @param userId The ID of the user.
 * @param placeId The ID of the place to favorite.
 * @returns The newly created place favorite.
 */
export const createPlaceFavorite = async (userId: string, placeId: string) => {
  const placeFavorite = await db.placeFavorite.create({
    data: {
      userId,
      placeId,
    },
  });
  return placeFavorite;
};

/**
 * Retrieves a list of place favorites for the given user ID.
 *
 * @param userId The ID of the user whose favorites to retrieve.
 * @returns A list of place favorites with the place and user objects included.
 */
export const getListPlaceFavorites = async (
  userId: string,
  querySort?: string,
) => {
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
 * Deletes a place favorite by its ID, user ID, and place ID.
 *
 * @param id The ID of the place favorite to delete.
 * @param userId The ID of the user who owns the favorite.
 * @param placeId The ID of the place that is favorited.
 * @returns The deleted place favorite object.
 * @throws {Error} If the place favorite could not be found or deleted.
 */
export const deletePlaceFavorite = async (id: string) => {
  const placeFavorite = await db.placeFavorite.delete({
    where: { id },
  });
  return placeFavorite;
};

import db from "@/libs/db";
import parseSorts from "@/utils/sort";

/**
 * Retrieves a list of favorite records for a given user ID, with optional sorting.
 *
 * @param username The ID of the user whose favorite records to retrieve.
 * @param querySort Optional query string parameter for sorting the results.
 * @returns A list of favorite records, with their associated places and users.
 */
export const getFavorites = async (username: string, querySort?: string) => {
  const orderBy = parseSorts(querySort);

  const placeFavorites = await db.placeFavorite.findMany({
    select: {
      id: true,
      place: {
        select: {
          name: true,
          slug: true,
          description: true,
          streetAddress: true,
          priceRange: true,
          latitude: true,
          longitude: true,
          city: {
            select: {
              name: true,
              state: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      user: {
        select: {
          name: true,
          username: true,
          avatarUrl: true,
        },
      },
    },
    where: { user: { username }, place: { isPublished: true } },
    orderBy,
  });

  if (!placeFavorites.length) {
    throw new Error("Favorite places not found");
  }

  const { name, username: userUsername, avatarUrl } = placeFavorites[0].user;

  const userFavorites = {
    name,
    username: userUsername,
    avatarUrl,
    placeFavorites: placeFavorites.map(({ id, place }) => ({
      favoriteId: id,
      name: place.name,
      slug: place.slug,
      description: place.description,
      streetAddress: place.streetAddress,
      priceRange: place.priceRange,
      latitude: place.latitude,
      longitude: place.longitude,
      city: {
        name: place.city?.name ?? "Unknown",
        state: place.city?.state?.name ?? "Unknown",
      },
    })),
  };

  return userFavorites;
};

/**
 * Creates a new favorite record in the database for the given user and place.
 *
 * @param userId The ID of the user favoriting the place.
 * @param placeId The ID of the place to favorite.
 * @returns The newly created favorite record.
 */
export const createFavorite = async (userId: string, placeId: string) => {
  const place = db.place.findUnique({
    where: { id: placeId, isPublished: true },
  });

  if (!place) {
    throw new Error("Place not found.");
  }

  const placeFavorite = await db.placeFavorite.upsert({
    where: {
      userId_placeId: { userId, placeId },
    },
    create: { userId, placeId },
    update: {},
  });

  return placeFavorite;
};

/**
 * Deletes a favorite record from the database for the given user and place ID.
 *
 * @param userId The ID of the user who owns the favorite record.
 * @param id The ID of the favorite record to delete.
 * @returns The deleted favorite record.
 */
export const deleteFavorite = async (userId: string, id: string) => {
  const placeFavoriteExists = await db.placeFavorite.findUnique({
    where: { id, userId },
  });

  if (!placeFavoriteExists) {
    throw new Error("Favorite place not found.");
  }

  const placeFavorite = await db.placeFavorite.delete({
    where: { id, userId },
  });

  return placeFavorite;
};

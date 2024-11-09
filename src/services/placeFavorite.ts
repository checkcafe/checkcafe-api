import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";

/**
 * Retrieves a list of favorite places for a user with optional filtering, sorting,
 * and pagination. The function returns the formatted favorite places along with
 * pagination details if the page parameter is provided.
 *
 * @param queryFilter Optional query string parameter for filtering the results.
 * @param querySort Optional query string parameter for sorting the results.
 * @param limit Optional limit parameter for the number of favorite places to retrieve,
 * defaults to 100.
 * @param page Optional page parameter for pagination.
 * @returns An object containing the user's favorite places, formatted with detailed
 * place and user information. If the page parameter is provided, it also returns
 * pagination details including total data count, total pages, items per page, and the
 * current page.
 * @throws {Error} If no favorite places are found.
 */
export const getFavorites = async (
  queryFilter?: string,
  querySort?: string,
  limit: number = 100,
  page?: number
) => {
  const where = parseFilters(queryFilter);
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
          latitude: true,
          longitude: true,
          priceRangeMin: true,
          priceRangeMax: true,
          openingTime: true,
          closingTime: true,
          thumbnailUrl: true,
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
    where,
    orderBy,
    take: limit,
    skip: page ? (page - 1) * limit : 0,
  });

  if (!placeFavorites.length) {
    throw new Error("Favorite places not found");
  }

  const { name, username: userUsername, avatarUrl } = placeFavorites[0].user;

  const placeFavoritesFormatted = {
    name,
    username: userUsername,
    avatarUrl,
    placeFavorites: placeFavorites.map(({ id, place }) => ({
      favoriteId: id,
      name: place.name,
      slug: place.slug,
      description: place.description,
      streetAddress: place.streetAddress,
      latitude: place.latitude,
      longitude: place.longitude,
      priceRangeMin: place.priceRangeMin,
      priceRangeMax: place.priceRangeMax,
      openingTime: place.openingTime,
      closingTime: place.closingTime,
      thumbnailUrl: place.thumbnailUrl,
      city: {
        name: place.city?.name ?? "Unknown",
        state: place.city?.state?.name ?? "Unknown",
      },
    })),
  };

  if (page) {
    const totalData = await db.placeFavorite.count({
      where,
    });
    const totalPage = Math.ceil(totalData / limit);
    const currentPage = page || 1;

    return {
      placeFavoritesFormatted,
      pagination: {
        totalData,
        totalPage,
        perPage: limit,
        currentPage,
      },
    };
  }

  return placeFavoritesFormatted;
};

/**
 * Creates or updates a favorite record in the database for the given user and place.
 *
 * @param userId The ID of the user favoriting the place.
 * @param placeId The ID of the place to favorite.
 * @returns The created or updated favorite record.
 */
export const upsertFavorite = async (userId: string, placeId: string) => {
  const place = await db.place.findUnique({
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
 * Deletes a favorite record from the database for the given user and place ID
 * if the place is published.
 *
 * @param userId The ID of the user who owns the favorite record.
 * @param placeFavoriteId The ID of the favorite record to delete.
 * @returns The deleted favorite record or throws an error if conditions are not met.
 */
export const deleteFavorite = async (
  userId: string,
  placeFavoriteId: string
) => {
  const placeFavorite = await db.placeFavorite.findFirst({
    where: {
      id: placeFavoriteId,
      userId: userId,
      place: {
        isPublished: true,
      },
    },
  });

  if (!placeFavorite) {
    throw new Error("Favorite not found.");
  }

  const deletedFavorite = await db.placeFavorite.delete({
    where: { id: placeFavoriteId, userId: userId },
  });

  return deletedFavorite;
};

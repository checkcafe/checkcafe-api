import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";
import { timeRegex } from "@/schemas/operatingHour";
import { formatOperatingHoursToTime, getOperatingHours } from "@/utils/time";
import {
  formatPlaceData,
  generateUniquePlaceName,
  generateUniqueSlug,
  photoSorts,
  prepareChildData,
} from "@/libs/place";

type User = {
  id: string;
  role: string;
};

/**
 * Creates a new place in the database with default values.
 *
 * @param userId The ID of the user making the request. The place will be associated with this user.
 * @returns The newly created place information, including its ID, name, slug, description, street address,
 * price range, and other details.
 */
export const postPlaces = async (userId: string) => {
  const name = await generateUniquePlaceName("Input name of Place");
  const slug = await generateUniqueSlug("New Place");

  return await db.place.create({
    data: {
      name,
      slug,
      description: "No Description",
      streetAddress: "Input street address of Place",
      isPublished: false,
      userId,
    },
  });
};

/**
 * Updates an existing place in the database.
 *
 * @param user The user making the request. Must be the owner of the place or have the ADMIN role.
 * @param placeId The ID of the place to update.
 * @param body The data to update the place with, including potential updates to operating hours,
 * facilities, photos, and other place details.
 * @throws {Error} If the place does not exist.
 * @throws {Error} If the user does not have permission to edit the place.
 * @returns The updated place information, including its operating hours, facilities, and photos.
 */
export const patchPlace = async (user: User, placeId: string, body: any) => {
  const existingPlace = await db.place.findFirst({
    where: { id: placeId },
  });
  if (!existingPlace) throw new Error("Place not found.");
  if (user.role === "USER" && existingPlace.userId !== user.id) {
    throw new Error("You do not have permission to edit this place.");
  }

  const { operatingHours, placeFacilities, placePhotos, slug, ...placeData } =
    body;
  const dataToUpdate: any = { ...placeData };

  if (slug) {
    const existingSlug = await db.place.findFirst({
      where: { slug, id: { not: placeId } },
    });
    if (existingSlug) {
      throw new Error("The provided slug is already in use.");
    }
    dataToUpdate.slug = slug;
  } else {
    dataToUpdate.slug = await generateUniqueSlug(body.name, existingPlace.slug);
  }

  if (operatingHours) {
    const { openingTime, closingTime } = await getOperatingHours(
      operatingHours
    );
    const operatingHoursData = await formatOperatingHoursToTime(operatingHours);
    dataToUpdate.openingTime = openingTime;
    dataToUpdate.closingTime = closingTime;
    dataToUpdate.operatingHours = prepareChildData(operatingHoursData);
  }

  if (placeFacilities) {
    dataToUpdate.placeFacilities = prepareChildData(placeFacilities);
  }

  if (placePhotos) {
    const photosOrders = photoSorts(placePhotos);
    dataToUpdate.thumbnailUrl = photosOrders[0]?.url;
    dataToUpdate.placePhotos = prepareChildData(photosOrders);
  }

  return db.place.update({
    where: { id: placeId },
    data: dataToUpdate,
    include: {
      operatingHours: true,
      placeFacilities: { include: { facility: true } },
      placePhotos: true,
    },
  });
};

/**
 * Toggles the `isPublished` status of a place for a given user.
 *
 * @param userId - The ID of the user attempting to toggle the publication status.
 * @param placeId - The ID of the place whose publication status is to be toggled.
 * @throws {Error} If the place does not exist or if the user does not have permission to edit the place.
 * @returns The updated place with the toggled `isPublished` status.
 */
export const patchIsPublished = async (userId: string, placeId: string) => {
  const place = await db.place.findUnique({ where: { id: placeId, userId } });

  if (!place) throw new Error("Place not found.");

  if (place.userId !== userId) {
    throw new Error("You do not have permission to edit this place.");
  }

  return db.place.update({
    where: { id: placeId },
    data: { isPublished: !place.isPublished },
  });
};

/**
 * Deletes a place from the database.
 *
 * @param placeId The ID of the place to delete.
 * @param user The user making the request. Must be the owner of the place or have the ADMIN role.
 * @throws {Error} If the user does not have permission to delete the place.
 * @throws {Error} If the place does not exist.
 */
export const deletePlace = async (placeId: string, user: User) => {
  const existingPlace = await db.place.findFirst({ where: { id: placeId } });

  if (!existingPlace) throw new Error("Place not found.");
  if (user.role === "USER" && existingPlace.userId !== user.id) {
    throw new Error("You do not have permission to edit this place.");
  }

  await db.place.delete({ where: { id: placeId } });
};

/**
 * Retrieves a list of places, with optional filtering and sorting.
 *
 * @param queryFilter Optional query string parameter for filtering the results.
 * @param querySort Optional query string parameter for sorting the results.
 * @param limit Optional limit parameter for the number of places to retrieve.
 * @param page Optional page parameter for pagination.
 * @returns A list of places, with their associated cities, users, operating hours,
 * facilities, and photos. The format of the returned object is determined by the
 * presence of the "user.username" filter in the queryFilter parameter.
 * @throws {Error} If no places are found that match the given filters.
 */
export const getPlaces = async (
  queryFilter?: string,
  querySort?: string,
  limit: number = 100,
  page?: number
) => {
  const where = parseFilters(queryFilter);
  const orderBy = parseSorts(querySort);

  if (where.operatingHours) {
    const parseTime = (time: string) => `1970-01-01T${time}:00.000Z`;

    const isValidTimeFormat = (time: string) => {
      return timeRegex.test(time);
    };

    const openingTimeCondition = where.operatingHours.openingTime
      ? {
          openingTime: {
            ...(where.operatingHours.openingTime.gte &&
              isValidTimeFormat(where.operatingHours.openingTime.gte) && {
                gte: new Date(
                  parseTime(where.operatingHours.openingTime.gte)
                ).toISOString(),
              }),
            ...(where.operatingHours.openingTime.gt &&
              isValidTimeFormat(where.operatingHours.openingTime.gt) && {
                gt: new Date(
                  parseTime(where.operatingHours.openingTime.gt)
                ).toISOString(),
              }),
          },
        }
      : undefined;

    const closingTimeCondition = where.operatingHours.closingTime
      ? {
          closingTime: {
            ...(where.operatingHours.closingTime.lte &&
              isValidTimeFormat(where.operatingHours.closingTime.lte) && {
                lte: new Date(
                  parseTime(where.operatingHours.closingTime.lte)
                ).toISOString(),
              }),
            ...(where.operatingHours.closingTime.lt &&
              isValidTimeFormat(where.operatingHours.closingTime.lt) && {
                lt: new Date(
                  parseTime(where.operatingHours.closingTime.lt)
                ).toISOString(),
              }),
          },
        }
      : undefined;

    where.operatingHours = {
      every: {
        ...openingTimeCondition,
        ...closingTimeCondition,
      },
    };
  }

  const places = await db.place.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      streetAddress: true,
      latitude: true,
      longitude: true,
      isPublished: true,
      priceRangeMin: true,
      priceRangeMax: true,
      openingTime: true,
      closingTime: true,
      thumbnailUrl: true,
      city: {
        select: {
          id: true,
          name: true,
          state: {
            select: {
              name: true,
              country: { select: { name: true, code: true, currency: true } },
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

  const formattedPlaces = places.map((place) =>
    formatPlaceData(place, !queryFilter?.includes("user.username"))
  );

  const user =
    places[0]?.user ||
    (await db.user.findUnique({
      where: { username: where.user.username.contains || "" },
      omit: { password: true },
    }));

  const data = queryFilter?.includes("user.username")
    ? {
        name: user?.name,
        username: user?.username,
        avatarUrl: user?.avatarUrl,
        places: formattedPlaces,
      }
    : formattedPlaces.map((place) => ({
        ...place,
        submitter: {
          name: user?.name,
          username: user?.username,
          avatarUrl: user?.avatarUrl,
        },
      }));
  if (page) {
    const totalData = await db.place.count({ where });
    const totalPage = Math.ceil(totalData / limit);
    const currentPage = page || 1;

    return {
      data,
      pagination: {
        totalData,
        totalPage,
        perPage: limit,
        currentPage,
      },
    };
  }

  return data;
};

/**
 * Retrieves a single place by its slug.
 * @param slug The slug of the place to retrieve.
 * @throws {Error} If the place is not found or is not published.
 * @returns The retrieved place, with its associated user, city, operating
 * hours, facilities, and photos.
 */
export const getPlaceBySlugOrId = async (slugOrId: string) => {
  const place = await db.place.findFirst({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      streetAddress: true,
      latitude: true,
      longitude: true,
      priceRangeMin: true,
      priceRangeMax: true,
      isPublished: true,
      user: {
        select: {
          name: true,
          username: true,
          avatarUrl: true,
        },
      },
      city: {
        select: {
          id: true,
          name: true,
          state: {
            select: {
              name: true,
              country: { select: { name: true, code: true, currency: true } },
            },
          },
        },
      },
      operatingHours: {
        select: {
          day: true,
          openingTime: true,
          closingTime: true,
        },
      },
      placeFacilities: {
        select: {
          description: true,
          facilityId: true,
          facility: { select: { name: true } },
        },
      },
      placePhotos: {
        select: { url: true, order: true },
      },
    },
    where: {
      OR: [{ slug: slugOrId }, { id: slugOrId }],
    },
  });

  // OPTIONAL TODO:
  // Check authorized user who can access the place which is not published yet

  if (!place) throw new Error("Place not found.");
  return formatPlaceData(place, true);
};

export const getFavoriteplaces = async (limit: number = 7) => {
  const places = await db.place.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      isPublished: true,
      priceRangeMin: true,
      priceRangeMax: true,
      openingTime: true,
      closingTime: true,
      thumbnailUrl: true,
      city: {
        select: {
          id: true,
          name: true,
          state: {
            select: {
              name: true,
              country: { select: { name: true, code: true, currency: true } },
            },
          },
        },
      },
      _count: {
        select: {
          placeFavorites: true,
        },
      },
    },
    orderBy: {
      placeFavorites: {
        _count: "desc",
      },
    },
    take: limit,
  });
  // console.log(places, "favouriteplaces");
  const formattedPlaces = places.map((place) => formatPlaceData(place));
  console.log(formattedPlaces, "favouriteplaces");
  return { formattedPlaces };
};

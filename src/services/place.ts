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
  return await db.place.create({
    data: {
      name: await generateUniquePlaceName("Input name of Place"),
      slug: await generateUniqueSlug("New Place"),
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

  const { operatingHours, placeFacilities, placePhotos, ...placeData } = body;
  const { openingTime, closingTime } = await getOperatingHours(operatingHours);
  const operatingHoursData = await formatOperatingHoursToTime(operatingHours);
  const newSlug = await generateUniqueSlug(body.name, existingPlace.slug);
  const photosOrders = photoSorts(placePhotos);

  return db.place.update({
    where: { id: placeId },
    data: {
      ...placeData,
      slug: newSlug,
      openingTime,
      closingTime,
      thumbnailUrl: photosOrders[0]?.url,
      operatingHours: prepareChildData(operatingHoursData),
      placeFacilities: prepareChildData(placeFacilities),
      placePhotos: prepareChildData(photosOrders),
    },
    include: {
      operatingHours: true,
      placeFacilities: { include: { facility: true } },
      placePhotos: true,
    },
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
 * @returns A list of places, with their associated cities, users, operating hours,
 * facilities, and photos. The format of the returned object is determined by the
 * presence of the "user.username" filter in the queryFilter parameter.
 * @throws {Error} If no places are found that match the given filters.
 */
export const getPlaces = async (queryFilter?: string, querySort?: string) => {
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
  });

  if (places.length === 0) throw new Error("Places not found.");

  const formattedPlaces = places.map((place) =>
    formatPlaceData(place, !queryFilter?.includes("user.username"))
  );

  const user = places[0]?.user;

  if (queryFilter?.includes("user.username")) {
    return {
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
      places: formattedPlaces,
    };
  }

  return formattedPlaces.map((place) => ({
    ...place,
    submitter: user
      ? {
          name: user.name,
          username: user.username,
          avatarUrl: user.avatarUrl,
        }
      : undefined,
  }));
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
      user: {
        select: {
          name: true,
          username: true,
          avatarUrl: true,
        },
      },
      city: {
        select: {
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

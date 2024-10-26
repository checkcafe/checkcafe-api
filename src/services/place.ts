import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";
import slugify from "@/utils/slugify";
import { timeRegex } from "@/schemas/operatingHour";
import { formatTime, getOperatingHours } from "@/utils/time";

type User = {
  id: string;
  role: string;
};

// Helper function to format place data
const formatPlaceData = (
  place: any,
  submitter?: boolean,
  thumbnail?: boolean,
  detailedOperatingHours: boolean = false
) => {
  const formattedData: any = {
    id: place.id,
    name: place.name,
    slug: place.slug,
    description: place.description,
    currency: place.city?.state.country.currency ?? null,
    priceRange: place.priceRange,
    latitude: place.latitude,
    longitude: place.longitude,
    address: {
      street: place.streetAddress,
      city: place.city?.name ?? null,
      state: place.city?.state.name ?? null,
      country: place.city?.state.country.name ?? null,
      countryCode: place.city?.state.country.code ?? null,
    },
  };

  if (place.operatingHours) {
    if (detailedOperatingHours) {
      formattedData.operatingHours = place.operatingHours.map(
        ({
          day,
          openingTime,
          closingTime,
        }: {
          day: string;
          openingTime: string;
          closingTime: string;
        }) => ({
          day,
          start: formatTime(openingTime),
          end: formatTime(closingTime),
        })
      );
    } else {
      const { openingTime, closingTime } = getOperatingHours(
        place.operatingHours
      );
      formattedData.openingTime = openingTime;
      formattedData.closingTime = closingTime;
    }
  }

  if (place.placeFacilities) {
    formattedData.placeFacilities = place.placeFacilities.map(
      (facility: { facility: { name: string }; description: string }) => ({
        facility: facility.facility.name,
        description: facility.description,
      })
    );
  }

  if (place.placePhotos) {
    const sortedPhotos = place.placePhotos.sort(
      (a: { order: number }, b: { order: number }) => a.order - b.order
    );
    const photoUrls = sortedPhotos.map((photo: { url: string }) => photo.url);

    if (thumbnail) {
      formattedData.thumbnail = photoUrls[0];
    } else {
      formattedData.photos = photoUrls;
    }
  }

  if (submitter && place.user) {
    formattedData.submitter = {
      name: place.user.name,
      username: place.user.username,
      avatarUrl: place.user.avatarUrl,
    };
  }

  return formattedData;
};

// Helper function to generate slug
const generateUniqueSlug = async (name: string, existingSlug?: string) => {
  const baseSlug = slugify(name);
  let slug = baseSlug;
  let count = 1;

  while (true) {
    const existing = await db.place.findFirst({ where: { slug } });
    if (!existing || slug === existingSlug) {
      break;
    }
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
};

// Helper function to prepare child data
const prepareChildData = (newData: any[]) =>
  newData
    ? { deleteMany: {}, create: newData.map((item: any) => ({ ...item })) }
    : undefined;

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
      name: "Input name of Place",
      slug: await generateUniqueSlug("New Place"),
      description: "No Description",
      streetAddress: "Input street address of Place",
      priceRange: "$-$$$",
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
    include: {
      operatingHours: true,
      placeFacilities: true,
      placePhotos: true,
    },
  });

  if (!existingPlace) throw new Error("Place not found.");
  if (user.role === "USER" && existingPlace.userId !== user.id) {
    throw new Error("You do not have permission to edit this place.");
  }

  const newSlug = await generateUniqueSlug(body.name, existingPlace.slug);
  const { operatingHours, placeFacilities, placePhotos, ...placeData } = body;

  return await db.place.update({
    where: { id: placeId },
    data: {
      ...placeData,
      slug: newSlug,
      operatingHours: prepareChildData(operatingHours),
      placeFacilities: prepareChildData(placeFacilities),
      placePhotos: prepareChildData(placePhotos),
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
    throw new Error("You do not have permission to delete this place.");
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
      priceRange: true,
      latitude: true,
      longitude: true,
      isPublished: true,
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
      operatingHours: true,
      placePhotos: true,
    },
    where,
    orderBy,
  });

  if (places.length === 0) throw new Error("Places not found.");

  const formattedPlaces = places.map((place) =>
    formatPlaceData(place, !queryFilter?.includes("user.username"), true)
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
export const getPlaceBySlug = async (slug: string) => {
  const place = await db.place.findFirst({
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      streetAddress: true,
      priceRange: true,
      latitude: true,
      longitude: true,
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
    where: { slug, isPublished: true },
  });

  if (!place) throw new Error("Place not found.");

  return formatPlaceData(place, true, false, true);
};

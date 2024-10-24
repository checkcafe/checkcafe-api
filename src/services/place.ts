import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";
import slugify from "@/utils/slugify";

type User = {
  id: string;
  role: string;
};

/**
 * Prepares child data to be used in Prisma's `update` method when updating
 * a parent model with its child relations.
 *
 * @param {any[]} existingData - The existing child data to be updated.
 * @param {any[]} newData - The new child data to be created.
 * @returns { { deleteMany: {}, create: any[] } | undefined } - The prepared child data.
 */
const prepareChildData = (
  existingData: any[],
  newData: any[]
): { deleteMany: {}; create: any[] } | undefined => {
  return newData || existingData
    ? {
        deleteMany: {},
        create: newData && newData.map((item: any) => ({ ...item })),
      }
    : undefined;
};

/**
 * Generate a unique slug based on the given name.
 *
 * @param name - The name to generate the slug from.
 * @returns A unique slug.
 */
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

/**
 * Create a new place, together with a new city, state and country if they don't exist.
 * @param userId The ID of the user who creates the place.
 * @returns The newly created place.
 */
export const postPlaces = async (userId: string) => {
  const place = await db.place.create({
    data: {
      name: "Input name of Place",
      slug: await generateUniqueSlug("New Place"),
      description: "No Description",
      streetAddress: "Input street address of Place",
      priceRange: "$-$$$",
      isPublished: false,
      userId: userId,
    },
  });

  return place;
};

/**
 * Update a place and return the updated place with its child relations.
 *
 * @param userId - The ID of the user who owns the place.
 * @param placeId - The ID of the place to update.
 * @param body - The data to update the place with, which may include:
 *   - operatingHours: An array of objects with day, startDateTime, endDateTime.
 *   - placeFeatures: An array of objects with featureId and description.
 *   - placePhotos: An array of objects with url and order.
 * @throws {Error} - If the place does not exist or the user is not the owner.
 * @returns The updated place including its child relations.
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

  if (!existingPlace) {
    throw new Error("Place not found.");
  }

  if (user.role === "USER" && existingPlace.userId !== user.id) {
    throw new Error("You do not have permission to edit this place.");
  }

  const newSlug = await generateUniqueSlug(body.name, existingPlace.slug);
  const { operatingHours, placeFacilities, placePhotos, ...placeData } = body;

  const updatedPlace = await db.place.update({
    where: { id: placeId },
    data: {
      ...placeData,
      slug: newSlug,
      userId: existingPlace.userId,
      operatingHours: prepareChildData(
        existingPlace.operatingHours,
        operatingHours
      ),
      placeFacilities: prepareChildData(
        existingPlace.placeFacilities,
        placeFacilities
      ),
      placePhotos: prepareChildData(existingPlace.placePhotos, placePhotos),
    },
    include: {
      operatingHours: true,
      placeFacilities: { include: { facility: true } },
      placePhotos: true,
    },
  });

  return updatedPlace;
};

/**
 * Deletes a place if the user has permission.
 *
 * @param placeId The ID of the place to delete.
 * @param user An object containing the user's ID and role.
 * @throws {Error} If the place is not found or the user does not have permission to delete.
 */
export const deletePlace = async (placeId: string, user: User) => {
  const existingPlace = await db.place.findFirst({
    where: { id: placeId },
  });

  if (!existingPlace) {
    throw new Error("Place not found.");
  }

  if (user.role === "USER" && existingPlace.userId !== user.id) {
    throw new Error("You do not have permission to delete this place.");
  }

  await db.place.delete({ where: { id: placeId } });
};

/**
 * Retrieves a list of places based on the provided filters and sorting options.
 *
 * @param queryFilter The filter string to apply to the places list.
 * @param querySort The sort string to apply to the places list.
 * @returns A list of places with selected properties like id, name, and code.
 */
export const getPlaces = async (queryFilter?: string, querySort?: string) => {
  const where = parseFilters(queryFilter);
  const orderBy = parseSorts(querySort);

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
        },
      },
      user: {
        select: {
          name: true,
          username: true,
          avatar_url: true,
        },
      },
    },
    where,
    orderBy,
  });

  if (places.length === 0) {
    throw new Error("Places not found.");
  }

  if (!queryFilter?.includes("user.username")) {
    const mappedPlaces = places.map((item) => ({
      ...item,
      submitter: item.user,
      user: undefined,
    }));

    return mappedPlaces;
  }

  const { user } = places[0];

  return {
    name: user.name,
    username: user.username,
    avatar_url: user.avatar_url,
    places: places.map(
      ({
        id,
        name,
        slug,
        description,
        streetAddress,
        priceRange,
        latitude,
        longitude,
        isPublished,
        city,
      }) => ({
        id,
        name,
        slug,
        description,
        streetAddress,
        priceRange,
        latitude,
        longitude,
        isPublished,
        city,
      })
    ),
  };
};

/**
 * Retrieves a place by its slug.
 *
 * @param slug The slug of the place to retrieve.
 * @returns The place object if found, otherwise null.
 */
export const getPlaceBySlug = async (slug: string) => {
  const place = await db.place.findFirst({
    where: { slug },
    include: {
      operatingHours: {
        select: {
          day: true,
          startDateTime: true,
          endDateTime: true,
          placeId: true,
        },
      },
      placeFacilities: {
        select: {
          description: true,
          facilityId: true,
          placeId: true,
        },
      },
      placePhotos: {
        select: {
          url: true,
          order: true,
          placeId: true,
        },
      },
    },
  });

  if (!place) {
    throw new Error("Place not found.");
  }

  return place;
};

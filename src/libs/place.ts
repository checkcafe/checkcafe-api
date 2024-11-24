import slugify from "@/utils/slugify";
import db from "./db";

/**
 * Generates a unique name for a place.
 *
 * If the provided `requestedName` is not already in use by another place,
 * this function will return the `requestedName` as is. Otherwise, this
 * function will append a counter to the `requestedName` and return the
 * resulting string. The counter is incremented until a unique name is
 * found.
 *
 * @param requestedName - The name that the user would like to use for the
 *                        place.
 *
 * @returns A unique name for a place.
 */
export const generateUniquePlaceName = async (
  requestedName: string
): Promise<string> => {
  const countResult = await db.place.count({
    where: {
      name: {
        startsWith: requestedName,
      },
    },
  });

  if (countResult === 0) {
    return requestedName;
  }

  return `${requestedName} ${countResult + 1}`;
};

/**
 * Generates a unique slug for a place name.
 *
 * @param name - The name of the place for which to generate a slug.
 * @param existingSlug - An optional existing slug to compare against.
 * @returns A unique slug generated from the provided name, ensuring it is not
 *          already in use by another place in the database, except for the
 *          provided existingSlug.
 */
export const generateUniqueSlug = async (
  name: string,
  existingSlug?: string
): Promise<string> => {
  const baseSlug = slugify(name);

  const countResult = await db.place.count({
    where: {
      slug: {
        startsWith: baseSlug,
      },
    },
  });

  if (countResult === 0 || baseSlug === existingSlug) {
    return baseSlug;
  }

  return `${baseSlug}-${countResult + 1}`;
};

/**
 * Prepares child data for createMany and deleteMany operations.
 *
 * @param newData - An array of objects to be created or deleted.
 * @returns An object containing `deleteMany` and `create` properties.
 *          `deleteMany` is an empty object, and `create` is an array of objects
 *          cloned from the input `newData`.
 */
export const prepareChildData = (newData: any) =>
  newData && newData.length
    ? { deleteMany: {}, create: newData.map((item: any) => ({ ...item })) }
    : undefined;

/**
 * Sorts an array of place photos by their `order` property and maps each
 * photo to an object containing `url` and `order` properties. If a photo
 * does not have an `order` property, it defaults to 0.
 *
 * @param placePhotos - An array of place photos to be sorted and mapped.
 * @returns A sorted and mapped array of place photos with `url` and `order` properties.
 */
export const photoSorts = (placePhotos: { url: string; order?: number }[]) => {
  if (!placePhotos || placePhotos.length === 0) return [];

  return placePhotos
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((photo) => ({
      url: photo.url,
      order: photo.order ?? 0,
    }));
};

/**
 * Formats the place data object with various attributes for API response.
 *
 * @param place - The place object containing raw data from the database.
 * @param submitter - Optional flag to include submitter information.
 * @returns An object with formatted place data including id, name, slug,
 *          description, currency, price range, coordinates, opening and
 *          closing times, thumbnail URL, and address. It may also include
 *          operating hours, facilities, photos, and submitter details if
 *          available.
 */
export const formatPlaceData = (place: any, submitter?: boolean) => {
  const formattedData: any = {
    id: place.id,
    name: place.name,
    slug: place.slug,
    description: place.description,
    currency: place.city?.state.country.currency ?? null,
    priceRange: place.priceRange,
    latitude: place.latitude,
    longitude: place.longitude,
    priceRangeMin: place.priceRangeMin,
    priceRangeMax: place.priceRangeMax,
    openingTime: place.openingTime,
    closingTime: place.closingTime,
    thumbnailUrl: place.thumbnailUrl,
    isPublished: place.isPublished,
    address: {
      street: place.streetAddress,
      cityId: place.city?.id ?? null,
      city: place.city?.name ?? null,
      state: place.city?.state.name ?? null,
      country: place.city?.state.country.name ?? null,
      countryCode: place.city?.state.country.code ?? null,
    },
  };

  if (place.operatingHours) {
    formattedData.operatingHours = place.operatingHours;
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
    formattedData.photos = place.placePhotos;
  }

  if (place.user && submitter) {
    formattedData.submitter = {
      name: place.user.name,
      username: place.user.username,
      avatarUrl: place.user.avatarUrl,
    };
  }

  return formattedData;
};

import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";


/**
 * Create a new place, together with a new city, state and country if they don't exist.
 * @param userID The ID of the user who creates the place.
 * @returns The newly created place.
 */
export const postPlaces = async (userId: string) => {
    const place = await db.place.create({
        data: {
            name: "Input name of Place",
            slug: "new-place",
            description: "Input description of Place",
            streetAddress:"Input street address of Place",
            wifiSpeedAvg: 0,
            priceRange: "$$-$$",
            latitude: 0.0,
            longitude: 0.0,
            isPublished: false,
            city: {
                create: {
                    name: "New City",
                    state: {
                        create: {
                            name: "New State",
                            country: {
                                create: {
                                    name: "New Country",
                                    code: "Code of New Country",
                                }
                            }
                        }
                    }
                }
            },
            user: { connect: { id: userId } },
        }
    });

    return place;
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
    },
    where,
    orderBy,
  });

  return places;
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
  });
  
  return place;
}
import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";

/**
 * Retrieves a list of countries based on the provided filters and sorting options.
 *
 * @param queryFilter The filter string to apply to the countries list.
 * @param querySort The sort string to apply to the countries list.
 * @returns A list of countries with selected properties like id, name, and code.
 */
export const getCountries = async (
  queryFilter?: string,
  querySort?: string
) => {
  const where = parseFilters(queryFilter);
  const orderBy = parseSorts(querySort);

  const countries = await db.country.findMany({
    select: { id: true, name: true, code: true },
    where,
    orderBy,
  });

  return countries;
};

/**
 * Retrieves a list of states based on the provided filters and sorting options.
 *
 * @param queryFilter The filter string to apply to the states list.
 * @param querySort The sort string to apply to the states list.
 * @returns A list of states with selected properties like id, name, and code.
 */
export const getStates = async (queryFilter?: string, querySort?: string) => {
  const where = parseFilters(queryFilter);
  const orderBy = parseSorts(querySort);

  const states = await db.state.findMany({
    select: {
      id: true,
      name: true,
      country: { select: { name: true, code: true } },
    },
    where,
    orderBy,
  });

  return states;
};

/**
 * Retrieves a list of cities based on the provided filters and sorting options.
 *
 * @param queryFilter The filter string to apply to the cities list.
 * @param querySort The sort string to apply to the cities list.
 * @returns A list of cities with selected properties like id, name, and code.
 */
export const getCities = async (queryFilter?: string, querySort?: string) => {
  const where = parseFilters(queryFilter);
  const orderBy = parseSorts(querySort);

  const cities = await db.city.findMany({
    select: {
      id: true,
      name: true,
      state: {
        select: { name: true, country: { select: { name: true, code: true } } },
      },
    },
    where,
    orderBy,
  });

  return cities;
};

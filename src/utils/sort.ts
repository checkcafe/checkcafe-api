type SortOrder = "asc" | "desc";

/**
 * Parses the given sort string into a record of sort options.
 * The sort string should be a JSON object where each key is a field name
 * and each value is either "asc" or "desc" for sorting direction.
 *
 * @example
 * ```json
 * {"name": "asc", "country.code": "desc"}
 * ```
 * @param sort The sort string to parse.
 * @returns An array of sort options where each option is an object
 * with field name and sort direction.
 * @throws {Error} If the sort string is invalid or cannot be parsed.
 */
const parseSorts = (sort?: string | null): Array<Record<string, SortOrder>> => {
  if (!sort) return [];

  try {
    const sortParams = JSON.parse(sort);

    if (typeof sortParams !== "object") {
      throw new Error("Invalid sort format. Please provide valid JSON.");
    }

    const sortOptions: Array<Record<string, any>> = [];

    Object.keys(sortParams).forEach((key) => {
      const value = sortParams[key];

      const keys = key.split(".");

      if (
        typeof value !== "string" ||
        !["asc", "desc"].includes(value.toLowerCase())
      ) {
        throw new Error("Invalid sort type. Must be 'asc' or 'desc'.");
      }

      const sortDirection = value.toLowerCase() as SortOrder;

      let currentOption: Record<string, any> = {};
      let currentRef = currentOption;

      keys.forEach((k, index) => {
        if (index === keys.length - 1) {
          currentRef[k] = sortDirection;
        } else {
          currentRef[k] = currentRef[k] || {};
          currentRef = currentRef[k];
        }
      });

      sortOptions.push(currentOption);
    });

    return sortOptions;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default parseSorts;

type Filter = {
  [key: string]: string | number | Filter;
};

/**
 * Parse the given filters string into a record of filter conditions.
 * The filters string should be a JSON object where each key is a field name and
 * each value is either a string, number, or an object with filter conditions.
 *
 * @example
 * ```json
 * {"name": "contains", "country.code": "ID"}
 * ```
 * @param filters The filters string to parse.
 * @returns A record of filter conditions where each key is a field name and each
 *   value is a filter condition object.
 * @throws {Error} If the filters string is invalid or cannot be parsed.
 */
const parseFilters = (filters: string | undefined): Record<string, Filter> => {
  if (!filters) return {};

  try {
    const parsedFilters = JSON.parse(filters);

    if (typeof parsedFilters !== "object") {
      throw new Error("Invalid filter format. Please provide valid JSON.");
    }

    return Object.keys(parsedFilters).reduce(
      (conditions: Record<string, any>, key) => {
        const value = parsedFilters[key];

        const keys = key.split(".");
        const lastKey = keys.pop();

        if (lastKey === undefined) {
          throw new Error(`Invalid filter key: ${key}`);
        }

        let currentCondition = conditions;

        keys.forEach((k) => {
          if (!currentCondition[k]) {
            currentCondition[k] = {};
          }
          currentCondition = currentCondition[k];
        });

        if (typeof value === "string") {
          currentCondition[lastKey] = {
            contains: value,
            mode: "insensitive",
          };
        } else if (typeof value === "number") {
          currentCondition[lastKey] = {
            equals: value,
          };
        } else if (typeof value === "object") {
          currentCondition[lastKey] = parseFilters(JSON.stringify(value));
        }

        return conditions;
      },
      {} as Record<string, Filter>
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default parseFilters;

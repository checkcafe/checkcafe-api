import db from "@/libs/db";
import parseFilters from "@/utils/filter";
import parseSorts from "@/utils/sort";

/**
 * Retrieves a list of facilities from the database.
 *
 * @param {string} [queryFilter] An optional filter string to apply to the
 * facilities list.
 * @param {string} [querySort] An optional sort string to apply to the
 * facilities list.
 * @returns A list of facility objects.
 */
export const getFacilities = async (
  queryFilter?: string,
  querySort?: string
) => {
  const where = parseFilters(queryFilter);
  const orderBy = parseSorts(querySort);

  const facilities = await db.facility.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      facilityCategory: { select: { name: true, description: true } },
    },
    where,
    orderBy,
  });

  if (!facilities) {
    throw new Error("Facilities not found");
  }

  return facilities;
};

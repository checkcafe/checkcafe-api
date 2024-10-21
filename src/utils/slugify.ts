/**
 * Creates a slug from a given string.
 *
 * @remarks
 * This is a simplified slugify function that is suitable for most use cases.
 * It does the following:
 * - Trims the string
 * - Converts it to lowercase
 * - Replaces spaces with dashes
 * - Removes any accent marks
 *
 * @param name The string to slugify
 * @returns The slugified string
 */
const slugify = (name: string) => {
  return name
    .trim()
    .toLowerCase()
    .replace(/ /g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export default slugify;

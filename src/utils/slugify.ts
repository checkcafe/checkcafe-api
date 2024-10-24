/**
 * Creates a slug from a given string.
 *
 * @remarks
 * This is a slugify function that is suitable for most use cases.
 * It does the following:
 * - Trims the string
 * - Converts it to lowercase
 * - Replaces spaces with dashes
 * - Removes any accent marks
 * - Removes special characters and non-alphanumeric characters except for dashes
 *
 * @param name The string to slugify
 * @returns The slugified string
 */
const slugify = (name: string): string => {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/#/g, "number")
    .replace(/[\s%+]/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export default slugify;

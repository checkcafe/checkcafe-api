import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const TIMEZONE = process.env.TIMEZONE || "UTC";

/**
 * Format a datetime string into a time string (HH:mm) using the server's timezone.
 *
 * @param {string} dateTime - The datetime string to format.
 * @returns {string} A time string in the format HH:mm.
 */
export const formatTime = (dateTime: string): string => {
  return dayjs.utc(dateTime).tz(TIMEZONE).format("HH:mm");
};

/**
 * Get the opening and closing times from operating hours.
 *
 * @param {Array<{ openingTime: string; closingTime: string }> } operatingHours - The operating hours array.
 * @returns {{ openingTime: string | null, closingTime: string | null }} An object containing the opening and closing times.
 */
export const getOperatingHours = (
  operatingHours: Array<{ openingTime: string; closingTime: string }>
): { openingTime: string; closingTime: string } => {
  if (!operatingHours || operatingHours.length === 0) {
    return { openingTime: "-", closingTime: "-" };
  }

  const openingTimes = operatingHours
    .map(({ openingTime }) =>
      openingTime ? dayjs.utc(openingTime).tz(TIMEZONE) : null
    )
    .filter(Boolean) as dayjs.Dayjs[];

  const closingTimes = operatingHours
    .map(({ closingTime }) =>
      closingTime ? dayjs.utc(closingTime).tz(TIMEZONE) : null
    )
    .filter(Boolean) as dayjs.Dayjs[];

  const openingTime = openingTimes.length
    ? openingTimes.sort((a, b) => a.valueOf() - b.valueOf())[0].format("HH:mm")
    : "-";

  const latestClosingTime = closingTimes.length
    ? closingTimes.reduce((latest, current) => {
        if (current.hour() < 6 && latest.hour() >= 18) {
          return current;
        }
        return current.isAfter(latest) ? current : latest;
      })
    : null;

  const closingTime = latestClosingTime
    ? latestClosingTime.format("HH:mm")
    : "-";

  return {
    openingTime,
    closingTime,
  };
};

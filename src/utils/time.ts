import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { OperatingHour } from "@/types/place";

dayjs.extend(utc);
dayjs.extend(timezone);

interface OperatingHourFormatted {
  day: string;
  openingTime: Date | null;
  closingTime: Date | null;
}

interface OperatingHoursSummary {
  openingTime: Date | string;
  closingTime: Date | string;
}

const TIMEZONE = process.env.TIMEZONE || "UTC";

/**
 * Format a datetime string into a time string (HH:mm) using the server's timezone.
 *
 * @param dateTime - The datetime string to format.
 * @returns A time string in the format HH:mm.
 */
export const formatTime = (dateTime: string): string => {
  return dayjs.utc(dateTime).tz(TIMEZONE).format("HH:mm");
};

/**
 * Converts an array of operating hours into an array of objects with Date objects
 * for opening and closing times.
 *
 * @param operatingHours - The operating hours to format.
 * @returns A promise that resolves to an array of `OperatingHourFormatted` objects.
 */
export const formatOperatingHoursToTime = async (
  operatingHours: OperatingHour[]
): Promise<OperatingHourFormatted[]> => {
  if (!operatingHours || operatingHours.length === 0) {
    return [];
  }

  return operatingHours.map(({ day, openingTime, closingTime }) => ({
    day,
    openingTime: openingTime
      ? dayjs.utc(`1970-01-01T${openingTime}`).toDate()
      : null,
    closingTime: closingTime
      ? dayjs.utc(`1970-01-01T${closingTime}`).toDate()
      : null,
  }));
};

/**
 * Retrieves the earliest opening time and the latest closing time from the given
 * operating hours.
 *
 * @param operatingHours - The operating hours to retrieve the opening and closing times from.
 * @returns A promise that resolves to an `OperatingHoursSummary` object.
 */
export const getOperatingHours = async (
  operatingHours: Array<{ openingTime: string; closingTime: string }>
): Promise<OperatingHoursSummary> => {
  if (!operatingHours || operatingHours.length === 0) {
    return { openingTime: "-", closingTime: "-" };
  }

  const openingTimes = operatingHours
    .map(({ openingTime }) =>
      openingTime ? dayjs.utc(`1970-01-01T${openingTime}Z`).toDate() : null
    )
    .filter(Boolean) as Date[];

  const closingTimes = operatingHours
    .map(({ closingTime }) =>
      closingTime ? dayjs.utc(`1970-01-01T${closingTime}Z`).toDate() : null
    )
    .filter(Boolean) as Date[];

  const openingTime =
    openingTimes.length > 0
      ? openingTimes.sort((a, b) => a.getTime() - b.getTime())[0]
      : "-";

  const latestClosingTime =
    closingTimes.length > 0
      ? closingTimes.reduce((latest, current) => {
          if (current.getUTCHours() < 6 && latest.getUTCHours() >= 18) {
            return current;
          }
          return current > latest ? current : latest;
        })
      : "-";

  return {
    openingTime,
    closingTime: latestClosingTime,
  };
};

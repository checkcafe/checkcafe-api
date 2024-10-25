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
  return dayjs.tz(dateTime, TIMEZONE).format("HH:mm");
};

/**
 * Get the opening and closing times from operating hours.
 *
 * @param {Array<{ startDateTime: string; endDateTime: string }> } operatingHours - The operating hours array.
 * @returns {{ openingTime: string | null, closingTime: string | null }} An object containing the opening and closing times.
 */
export const getOperatingHours = (
  operatingHours: Array<{ startDateTime: string; endDateTime: string }>
) => {
  if (!operatingHours || operatingHours.length === 0) {
    return { openingTime: null, closingTime: null };
  }

  const openingTimes = operatingHours.map(({ startDateTime }) =>
    dayjs.tz(startDateTime, TIMEZONE)
  );

  const closingTimes = operatingHours.map(({ endDateTime }) =>
    dayjs.tz(endDateTime, TIMEZONE)
  );

  // Ambil openingTime yang paling awal
  const openingTime = openingTimes
    .sort((a, b) => a.valueOf() - b.valueOf())[0]
    .format("HH:mm");

  // Ambil closingTime yang paling akhir, dengan mempertimbangkan jam tutup lewat tengah malam
  const latestClosingTime = closingTimes.reduce((latest, current) => {
    // Jika current jam kurang dari 6 dan latest jam lebih dari atau sama dengan 18,
    // anggap itu adalah waktu penutupan untuk hari berikutnya
    if (current.hour() < 6 && latest.hour() >= 18) {
      return current; // Ambil current sebagai closingTime
    }
    // Kembalikan closingTime yang lebih lama
    return current.isAfter(latest) ? current : latest;
  });

  const closingTime = latestClosingTime.format("HH:mm");

  return {
    openingTime,
    closingTime,
  };
};

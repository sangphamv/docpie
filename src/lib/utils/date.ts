//npm install date-fns

import { formatDistanceToNow, parseISO, format } from "date-fns";
import { vi } from "date-fns/locale";

const FORMAT_LONG = "EEEE, dd MMMM , yyyy h:mm a zz";
const FORMAT_SHORT = "dd MMMM , yyyy zz";

const dateCache = new Map<string, Date>();

export const getDateDistance = (date: string) =>
  formatDistanceToNow(parseISO(date), {
    addSuffix: true,
    locale: vi,
  });

export const normalizeDate = (date: string | Date): string =>
  date instanceof Date ? date.toISOString() : date;

const getParsedDate = (dateString: string): Date => {
  if (dateCache.has(dateString)) {
    return dateCache.get(dateString)!;
  }

  const parsedDate = parseISO(dateString);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date value provided.");
  }

  dateCache.set(dateString, parsedDate);
  return parsedDate;
};

export const formatDate = (
  date: string | Date,
  formatType: "long" | "short" = "long"
) => {
  const dateString = date instanceof Date ? date.toISOString() : date;
  const parsedDate = getParsedDate(dateString);

  return format(
    parsedDate,
    formatType === "short" ? FORMAT_SHORT : FORMAT_LONG,
    { locale: vi }
  );
};
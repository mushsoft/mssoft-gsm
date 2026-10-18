// East Africa Time (Kampala) is a fixed UTC+3 with no DST — safe to hardcode
// the offset instead of pulling in a timezone library just for day math.
const EAT_OFFSET_MS = 3 * 60 * 60 * 1000;

/**
 * The UTC instant for midnight (00:00) East Africa Time, `daysAgo` days
 * before the current EAT calendar day. "Today"/date-range cutoffs must key
 * off Kampala's clock, not the server process's own timezone (which on most
 * hosts is UTC and would otherwise shift the day boundary by 3 hours).
 */
export function startOfEatDay(daysAgo = 0): Date {
  const eatNow = new Date(Date.now() + EAT_OFFSET_MS);
  eatNow.setUTCHours(0, 0, 0, 0);
  eatNow.setUTCDate(eatNow.getUTCDate() - daysAgo);
  return new Date(eatNow.getTime() - EAT_OFFSET_MS);
}

/** The "YYYY-MM-DD" key for the EAT calendar day `daysAgo` days before today — matches the day grouping `startOfEatDay` buckets against. */
export function eatDateKey(daysAgo = 0): string {
  return new Date(startOfEatDay(daysAgo).getTime() + EAT_OFFSET_MS).toISOString().slice(0, 10);
}

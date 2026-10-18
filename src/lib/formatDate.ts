// The business operates out of Kampala — dates/times shown to anyone
// (customer or admin) must read as East Africa Time regardless of the
// server's or viewer's own device timezone, not drift per-viewer.
const EAT_TIMEZONE = 'Africa/Kampala';

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString('en-GB', {
    timeZone: EAT_TIMEZONE,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  });
}

export function formatTime(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleTimeString('en-GB', {
    timeZone: EAT_TIMEZONE,
    hour: '2-digit',
    minute: '2-digit',
    ...options,
  });
}

import { formatUsd } from './softwareToolPricing';

// Wallet balances are held in USD cents (unlock tools are priced in USD).
// Customers pay top-ups in UGX at our rate (live market rate + add-on, see
// usdRate.ts), locked in when the top-up starts.
export const MIN_TOPUP_CENTS = 100; // $1
export const MAX_TOPUP_CENTS = 100_000; // $1,000
export const TOPUP_PRESETS_USD = [5, 10, 20, 50];

export type ParsedTopUpAmount = { cents: number; error?: undefined } | { cents?: undefined; error: string };

// Accepts what a form sends ("20", "12.5", 20) — whole dollars or up to two
// decimal places, nothing else. Converted to integer cents without float
// noise (12.29 * 100 is 1228.9999999999998).
export function parseTopUpAmount(raw: unknown): ParsedTopUpAmount {
  const text = typeof raw === 'number' ? String(raw) : typeof raw === 'string' ? raw.trim() : '';
  if (!/^\d+(\.\d{1,2})?$/.test(text)) return { error: 'Enter an amount in dollars, e.g. 20 or 12.50.' };
  const [whole, fraction = ''] = text.split('.');
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, '0'));
  if (cents < MIN_TOPUP_CENTS) return { error: `The minimum top-up is ${formatUsd(MIN_TOPUP_CENTS / 100)}.` };
  if (cents > MAX_TOPUP_CENTS) return { error: `The maximum top-up is ${formatUsd(MAX_TOPUP_CENTS / 100)}.` };
  return { cents };
}

// UGX the customer pays for a top-up, rounded up to the whole shilling so
// we never receive less than the dollars we credit.
export function topUpUgx(cents: number, usdRate: number): number {
  return Math.ceil((cents * usdRate) / 100);
}

export function formatUsdCents(cents: number): string {
  return cents < 0 ? `-${formatUsd(-cents / 100)}` : formatUsd(cents / 100);
}

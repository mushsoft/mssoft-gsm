// Markup applied on top of the raw supplier credit cost before converting to
// UGX. Flat and simple on purpose — the thing that actually moves is
// creditRateUgx (ShopProfile), which the admin updates whenever the
// supplier's rate changes; this stays a constant.
export const SOFTWARE_TOOL_MARKUP = 0.5;

// Rounds up to a clean UGX amount so prices never show odd numbers like
// "41,223" — a customer-facing price should look deliberately set.
const ROUND_TO_UGX = 500;

export function roundUpUgx(amount: number): number {
  return Math.ceil(amount / ROUND_TO_UGX) * ROUND_TO_UGX;
}

export function computeSoftwareToolPrice(creditCost: number, creditRateUgx: number): number {
  return roundUpUgx(creditCost * creditRateUgx * (1 + SOFTWARE_TOOL_MARKUP));
}

// Per-credit products (customer picks a quantity) are priced per unit to the
// whole shilling, and only the order total is rounded to ROUND_TO_UGX —
// rounding each unit up first would overcharge large orders (a UGX 7,740
// credit rounded to 8,000 makes 100 credits cost 26,000 too much).
export function computeSoftwareToolUnitPrice(creditCost: number, creditRateUgx: number): number {
  return Math.ceil(creditCost * creditRateUgx * (1 + SOFTWARE_TOOL_MARKUP));
}

// USD is the headline price on the unlock-tools page (technicians compare
// tool prices in dollars). Supplier Credits are treated as 1 Credit = 1 USD,
// the norm on GSM credit servers, so no exchange rate is involved — the same
// markup applies. Rounded up to the cent; toFixed first so float noise like
// 1.2 × 1.5 × 100 = 180.00000000000003 doesn't ceil to 181.
export function computeSoftwareToolPriceUsd(creditCost: number): number {
  const cents = Number((creditCost * (1 + SOFTWARE_TOOL_MARKUP) * 100).toFixed(6));
  return Math.ceil(cents) / 100;
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Total for a per-credit order, to the cent — same float guard as above.
export function multiplyUsd(unitUsd: number, quantity: number): number {
  return Math.round(unitUsd * 100 * quantity) / 100;
}

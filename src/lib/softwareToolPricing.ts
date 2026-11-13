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

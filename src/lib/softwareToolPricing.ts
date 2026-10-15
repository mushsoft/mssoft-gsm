// Markup applied on top of the raw supplier credit cost before converting to
// UGX. Flat and simple on purpose — the thing that actually moves is
// creditRateUgx (ShopProfile), which the admin updates whenever the
// supplier's rate changes; this stays a constant.
export const SOFTWARE_TOOL_MARKUP = 0.5;

// Rounds up to a clean UGX amount so prices never show odd numbers like
// "41,223" — a customer-facing price should look deliberately set.
const ROUND_TO_UGX = 500;

export function computeSoftwareToolPrice(creditCost: number, creditRateUgx: number): number {
  const raw = creditCost * creditRateUgx * (1 + SOFTWARE_TOOL_MARKUP);
  return Math.ceil(raw / ROUND_TO_UGX) * ROUND_TO_UGX;
}

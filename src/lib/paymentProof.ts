// Wallet top-ups proved with a screenshot: the customer pays our Mobile
// Money merchant code or our Binance account themselves, then uploads a
// picture of the confirmation. Nothing is credited until an admin has
// looked at the picture and checked the money arrived.

import { AIRTEL_MERCHANT_ID } from './airtelMerchant';

export type ProofMethod = 'MTN_MERCHANT' | 'AIRTEL_MERCHANT' | 'BINANCE';
export const PROOF_METHODS: readonly ProofMethod[] = ['MTN_MERCHANT', 'AIRTEL_MERCHANT', 'BINANCE'];

export function isProofMethod(value: unknown): value is ProofMethod {
  return typeof value === 'string' && (PROOF_METHODS as readonly string[]).includes(value);
}

export const PROOF_METHOD_LABELS: Record<ProofMethod, string> = {
  MTN_MERCHANT: 'MTN MoMo Pay',
  AIRTEL_MERCHANT: 'Airtel Pay Merchant',
  BINANCE: 'Binance (USDT)',
};

// Where each method's money goes, worked out from the shop settings. A
// method with no destination is never offered.
export interface ProofDestinations {
  MTN_MERCHANT?: { code: string };
  AIRTEL_MERCHANT?: { code: string };
  BINANCE?: { payId: string; name: string | null };
}

export function proofDestinations(profile: {
  businessName: string;
  mtnMerchantCode: string | null;
  airtelMerchantCode: string | null;
  binancePayId: string | null;
  binanceName: string | null;
}): ProofDestinations {
  const out: ProofDestinations = {};
  if (profile.mtnMerchantCode) out.MTN_MERCHANT = { code: profile.mtnMerchantCode };
  out.AIRTEL_MERCHANT = { code: profile.airtelMerchantCode || AIRTEL_MERCHANT_ID };
  if (profile.binancePayId) out.BINANCE = { payId: profile.binancePayId, name: profile.binanceName };
  return out;
}

export function availableProofMethods(destinations: ProofDestinations): ProofMethod[] {
  return PROOF_METHODS.filter((m) => destinations[m]);
}

// Binance top-ups are paid in USDT at 1 USDT = $1, so no shillings are
// involved; Mobile Money is paid in UGX at our rate like other top-ups.
export function paysInUsdt(method: ProofMethod): boolean {
  return method === 'BINANCE';
}

// The browser shrinks photos before upload (see WalletTopUpForm), so a
// real screenshot is far below this. Also under Vercel's request size limit.
export const MAX_PROOF_BYTES = 4 * 1024 * 1024;

// Trusts the file's own first bytes, never its name or the type the
// browser claims, so only real JPEG/PNG/WebP images are stored and later
// served to the admin as images.
export function detectImageType(bytes: Uint8Array): 'image/jpeg' | 'image/png' | 'image/webp' | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (
    bytes.length >= 8 &&
    [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((b, i) => bytes[i] === b)
  ) {
    return 'image/png';
  }
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
  if (bytes.length >= 12 && ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return 'image/webp';
  return null;
}

// Optional transaction ID the customer may type next to the screenshot.
export function parseProofReference(raw: unknown): { value: string | null; error?: string } {
  const text = typeof raw === 'string' ? raw.trim().toUpperCase() : '';
  if (!text) return { value: null };
  if (!/^[A-Z0-9.\-_]{4,64}$/.test(text)) {
    return { value: null, error: 'The transaction ID can only have letters, numbers, dots and hyphens.' };
  }
  return { value: text };
}

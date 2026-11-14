// Which payment methods the site may offer right now — one place, used by
// the cart checkout, the checkout API and wallet top-ups.
//
// Rule: never offer a method that could take a fake payment as real, or
// take real money without us being told about it.
//  - On the live site (Vercel production), gateway TEST credentials are
//    ignored: a pawaPay sandbox URL or a Flutterwave FLWSECK_TEST key would
//    let anyone "pay" with test numbers/cards and get a real order or real
//    wallet credit. Locally and on preview deployments they still work, so
//    testing stays possible.
//  - Airtel Money direct is always offered: an admin confirms each payment
//    by hand against the Airtel SMS.
//
// Reads environment variables only (no DB), so it's safe to call anywhere
// on the server, including at build time.

export type PaymentMethod = 'PAWAPAY' | 'MOBILE_MONEY' | 'CARD' | 'AIRTEL_MONEY';

const PAWAPAY_LIVE_URL = 'https://api.pawapay.io';

function isLiveSite(): boolean {
  return process.env.VERCEL_ENV === 'production';
}

export function isPawapayEnabled(): boolean {
  const token = process.env.PAWAPAY_API_TOKEN;
  const baseUrl = process.env.PAWAPAY_BASE_URL || PAWAPAY_LIVE_URL;
  if (!token || !process.env.NEXT_PUBLIC_BASE_URL) return false;
  return !isLiveSite() || !/sandbox/i.test(baseUrl);
}

// Flutterwave can start a payment (key present, and a live key on the live site).
export function isFlutterwaveEnabled(): boolean {
  const key = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!key || !process.env.NEXT_PUBLIC_BASE_URL) return false;
  return !isLiveSite() || !key.startsWith('FLWSECK_TEST');
}

// …and its confirmation webhook can reach us. Orders tolerate a missing
// webhook (an admin can mark them paid after checking Flutterwave), but
// wallet top-ups don't — see availableTopUpMethods.
export function isFlutterwaveConfirmable(): boolean {
  return isFlutterwaveEnabled() && Boolean(process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH);
}

export function availableCheckoutMethods(): PaymentMethod[] {
  const methods: PaymentMethod[] = [];
  if (isPawapayEnabled()) methods.push('PAWAPAY');
  if (isFlutterwaveEnabled()) methods.push('MOBILE_MONEY', 'CARD');
  methods.push('AIRTEL_MONEY');
  return methods;
}

// Only offer a top-up gateway if we can both start a payment AND receive
// its confirmation — otherwise a customer could pay and never be credited.
export function availableTopUpMethods(): PaymentMethod[] {
  const methods: PaymentMethod[] = [];
  if (isPawapayEnabled()) methods.push('PAWAPAY');
  if (isFlutterwaveConfirmable()) methods.push('MOBILE_MONEY', 'CARD');
  methods.push('AIRTEL_MONEY');
  return methods;
}

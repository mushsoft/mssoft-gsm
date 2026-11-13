import 'server-only';

// Thin wrappers around the Flutterwave and pawaPay calls, used by wallet
// top-ups. They follow the same rules as the order checkout and webhooks in
// src/app/api/checkout (which still have their own inline copies):
//  - a payment only counts after re-fetching it from the gateway's own API,
//    never from a redirect or an unverified callback body;
//  - a network error / non-2xx / malformed answer from that API is
//    "transient" — inconclusive, never treated as a failed payment, so the
//    caller can leave things PENDING and let the gateway retry.

const FETCH_TIMEOUT_MS = 15_000;

function fetchWithTimeout(url: string, init: RequestInit = {}): Promise<Response> {
  return fetch(url, { ...init, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
}

function pawapayBase(): string {
  return process.env.PAWAPAY_BASE_URL || 'https://api.pawapay.io';
}

export type GatewayVerification<T> = { kind: 'final'; data: T } | { kind: 'transient'; reason: string };

// ---- Starting a payment -------------------------------------------------

export async function createPawapayPaymentPage(opts: {
  depositId: string;
  amountUgx: number;
  returnUrl: string;
  reason: string;
}): Promise<string> {
  const token = process.env.PAWAPAY_API_TOKEN;
  if (!token) throw new Error('PAWAPAY_API_TOKEN is not configured');
  const response = await fetchWithTimeout(`${pawapayBase()}/v2/paymentpage`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      depositId: opts.depositId,
      returnUrl: opts.returnUrl,
      amountDetails: { amount: String(opts.amountUgx), currency: 'UGX' },
      // Same as checkout: country only, and pawaPay's page collects the
      // customer's number itself.
      country: 'UGA',
      reason: opts.reason,
    }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || !data || data.status === 'REJECTED' || !data.redirectUrl) {
    throw new Error(data?.failureReason?.failureMessage || `pawaPay rejected the payment request (${response.status})`);
  }
  return data.redirectUrl as string;
}

export async function createFlutterwavePayment(opts: {
  txRef: string;
  amountUgx: number;
  redirectUrl: string;
  customer: { email: string; name: string; phone: string };
  title: string;
  description: string;
}): Promise<string> {
  const key = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!key) throw new Error('FLUTTERWAVE_SECRET_KEY is not configured');
  const response = await fetchWithTimeout('https://api.flutterwave.com/v3/payments', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      tx_ref: opts.txRef,
      amount: opts.amountUgx,
      currency: 'UGX',
      redirect_url: opts.redirectUrl,
      customer: { email: opts.customer.email, phonenumber: opts.customer.phone, name: opts.customer.name },
      customizations: { title: opts.title, description: opts.description },
    }),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.status !== 'success' || !data.data?.link) {
    throw new Error(data?.message || `Flutterwave rejected the payment request (${response.status})`);
  }
  return data.data.link as string;
}

// ---- Confirming a payment -----------------------------------------------

export interface FlutterwaveTransaction {
  status: string;
  tx_ref: string;
  currency: string;
  amount: number;
}

export async function verifyFlutterwaveTransaction(
  transactionId: string | number
): Promise<GatewayVerification<FlutterwaveTransaction>> {
  const key = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!key) return { kind: 'transient', reason: 'FLUTTERWAVE_SECRET_KEY is not configured' };
  let response: Response;
  try {
    response = await fetchWithTimeout(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
      headers: { Authorization: `Bearer ${key}` },
    });
  } catch (error) {
    return { kind: 'transient', reason: `verify request errored: ${String(error)}` };
  }
  if (!response.ok) return { kind: 'transient', reason: `verify returned ${response.status}` };
  const body = await response.json().catch(() => null);
  if (!body || body.status !== 'success' || !body.data) return { kind: 'transient', reason: 'verify response malformed' };
  return { kind: 'final', data: body.data as FlutterwaveTransaction };
}

export interface PawapayDeposit {
  depositId: string;
  status: string; // COMPLETED, FAILED, PROCESSING, IN_RECONCILIATION, ...
  currency: string;
  amount: string;
}

export async function getPawapayDeposit(depositId: string): Promise<GatewayVerification<PawapayDeposit>> {
  const token = process.env.PAWAPAY_API_TOKEN;
  if (!token) return { kind: 'transient', reason: 'PAWAPAY_API_TOKEN is not configured' };
  let response: Response;
  try {
    response = await fetchWithTimeout(`${pawapayBase()}/v2/deposits/${depositId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    return { kind: 'transient', reason: `status check errored: ${String(error)}` };
  }
  if (!response.ok) return { kind: 'transient', reason: `status check returned ${response.status}` };
  const body = await response.json().catch(() => null);
  if (!body || body.status !== 'FOUND' || !body.data) return { kind: 'transient', reason: 'status response malformed' };
  return { kind: 'final', data: body.data as PawapayDeposit };
}

import 'server-only';
import * as Sentry from '@sentry/nextjs';
import type { WalletTransaction } from '@prisma/client';
import { prisma } from './prisma';
import { getPawapayDeposit, verifyFlutterwaveTransaction } from './paymentGateways';

// Customer wallet: a prepaid USD balance (cents) for unlock-tool purchases.
//
// The balance on Customer.walletBalanceCents only ever changes inside the
// same DB transaction that moves a WalletTransaction to COMPLETED, and only
// if that row was still PENDING — the same atomic guard markOrderPaid uses —
// so a gateway redelivering its webhook, or an admin approving while a
// webhook arrives, can never credit a top-up twice.

export async function completeTopUp(id: string): Promise<{ transitioned: boolean }> {
  return prisma.$transaction(async (tx) => {
    const moved = await tx.walletTransaction.updateMany({
      where: { id, type: 'TOPUP', status: 'PENDING' },
      data: { status: 'COMPLETED', completedAt: new Date() },
    });
    if (moved.count === 0) return { transitioned: false };
    const topUp = await tx.walletTransaction.findUniqueOrThrow({ where: { id } });
    await tx.customer.update({
      where: { id: topUp.customerId },
      data: { walletBalanceCents: { increment: topUp.amountCents } },
    });
    return { transitioned: true };
  });
}

export async function failTopUp(id: string, note?: string): Promise<{ transitioned: boolean }> {
  const moved = await prisma.walletTransaction.updateMany({
    where: { id, type: 'TOPUP', status: 'PENDING' },
    data: { status: 'FAILED', completedAt: new Date(), ...(note ? { note } : {}) },
  });
  return { transitioned: moved.count > 0 };
}

// ---- Gateway webhooks ---------------------------------------------------
// Called from the existing /api/checkout/webhook endpoints (the gateways
// only allow one callback URL each), after they've recognised the payment
// as a wallet top-up rather than an order. Return what the endpoint should
// respond with: 503 asks the gateway to retry later.

export interface WebhookResult {
  status: number;
  body: Record<string, unknown>;
}

const ok: WebhookResult = { status: 200, body: { success: true } };
const retryLater: WebhookResult = {
  status: 503,
  body: { success: false, error: 'Verification temporarily unavailable' },
};

export async function handleFlutterwaveTopUpWebhook(txRef: string, transactionId: string | number): Promise<WebhookResult> {
  const topUp = await prisma.walletTransaction.findUnique({ where: { txRef } });
  if (!topUp || topUp.type !== 'TOPUP') {
    console.error('Flutterwave webhook received for unknown wallet top-up', { txRef });
    return { status: 404, body: { success: false, error: 'Top-up not found' } };
  }
  if (topUp.status !== 'PENDING') return ok;

  const verification = await verifyFlutterwaveTransaction(transactionId);
  if (verification.kind === 'transient') {
    console.error('Flutterwave verify inconclusive for wallet top-up (left PENDING for retry)', { txRef, reason: verification.reason });
    Sentry.captureMessage('Flutterwave verify inconclusive for wallet top-up', { level: 'error', extra: { txRef, reason: verification.reason } });
    return retryLater;
  }

  const tx = verification.data;
  const verified =
    tx.status === 'successful' &&
    tx.tx_ref === topUp.txRef &&
    tx.currency === 'UGX' &&
    typeof tx.amount === 'number' &&
    topUp.amountUgx !== null &&
    tx.amount >= topUp.amountUgx;

  if (!verified) {
    await failTopUp(topUp.id);
    console.error('Flutterwave verification: wallet top-up did not succeed', { txRef, tx });
    return { status: 400, body: { success: false, error: 'Payment could not be verified' } };
  }

  await completeTopUp(topUp.id);
  return ok;
}

export async function handlePawapayTopUpWebhook(topUp: WalletTransaction): Promise<WebhookResult> {
  if (topUp.status !== 'PENDING') return ok;
  const depositId = topUp.paymentReference!;

  const verification = await getPawapayDeposit(depositId);
  if (verification.kind === 'transient') {
    console.error('pawaPay status inconclusive for wallet top-up (left PENDING for retry)', { depositId, reason: verification.reason });
    Sentry.captureMessage('pawaPay status inconclusive for wallet top-up', { level: 'error', extra: { depositId, reason: verification.reason } });
    return retryLater;
  }

  const deposit = verification.data;
  // Not final yet — leave PENDING for pawaPay's next callback.
  if (deposit.status === 'PROCESSING' || deposit.status === 'IN_RECONCILIATION') return ok;

  const verified =
    deposit.status === 'COMPLETED' &&
    deposit.depositId === depositId &&
    deposit.currency === 'UGX' &&
    topUp.amountUgx !== null &&
    Number(deposit.amount) >= topUp.amountUgx;

  if (!verified) {
    await failTopUp(topUp.id);
    console.error('pawaPay verification: wallet top-up did not succeed', { depositId, deposit });
    return { status: 400, body: { success: false, error: 'Payment could not be verified' } };
  }

  await completeTopUp(topUp.id);
  return ok;
}

export function findPawapayTopUp(depositId: string) {
  return prisma.walletTransaction.findFirst({
    where: { paymentReference: depositId, paymentMethod: 'PAWAPAY', type: 'TOPUP' },
  });
}

// Wallet top-up references start with this, so the shared Flutterwave
// webhook can tell them apart from order references ("PH-...").
export const TOPUP_TX_REF_PREFIX = 'WT-';

export type TopUpPaymentMethod = 'PAWAPAY' | 'MOBILE_MONEY' | 'CARD' | 'AIRTEL_MONEY';

// Only offer a gateway if we can both start a payment AND receive its
// confirmation webhook — otherwise a customer could pay and never be
// credited. Flutterwave needs the webhook secret hash as well as the key.
export function availableTopUpMethods(): TopUpPaymentMethod[] {
  const methods: TopUpPaymentMethod[] = [];
  const baseUrl = Boolean(process.env.NEXT_PUBLIC_BASE_URL);
  if (baseUrl && process.env.PAWAPAY_API_TOKEN) methods.push('PAWAPAY');
  if (baseUrl && process.env.FLUTTERWAVE_SECRET_KEY && process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH) {
    methods.push('MOBILE_MONEY', 'CARD');
  }
  methods.push('AIRTEL_MONEY'); // confirmed by an admin, no gateway needed
  return methods;
}

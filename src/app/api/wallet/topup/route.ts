import { NextResponse } from 'next/server';
import * as Sentry from '@sentry/nextjs';
import { prisma } from '@/lib/prisma';
import { requireCustomerApi } from '@/lib/customerAuth';
import { createFlutterwavePayment, createPawapayPaymentPage } from '@/lib/paymentGateways';
import { rateLimit } from '@/lib/rateLimit';
import { getShopProfile } from '@/lib/shopProfile';
import { getUsdRate } from '@/lib/usdRate';
import { failTopUp, TOPUP_TX_REF_PREFIX } from '@/lib/wallet';
import { parseTopUpAmount, topUpUgx } from '@/lib/walletAmounts';

const PAYMENT_METHODS = ['PAWAPAY', 'MOBILE_MONEY', 'CARD', 'AIRTEL_MONEY'] as const;
type TopUpPaymentMethod = (typeof PAYMENT_METHODS)[number];
// Same loose check as checkout's Airtel Money transaction ID — an admin
// cross-checks it against the Airtel SMS/app before approving.
const AIRTEL_REFERENCE_PATTERN = /^[A-Za-z0-9.-]{6,40}$/;

// Starts a wallet top-up: records it as PENDING with the UGX amount and
// rate locked in, then hands the customer to the payment page. The balance
// is only credited later — by the gateway webhook after re-verifying the
// payment, or by an admin approving an Airtel Money top-up.
export async function POST(req: Request) {
  const customer = await requireCustomerApi();
  if (!customer) {
    return NextResponse.json({ success: false, error: 'Please log in to top up.' }, { status: 401 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(`wallet-topup:${customer.id}`, 10, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many top-up attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ success: false, error: 'Malformed request body' }, { status: 400 });
  }

  const amount = parseTopUpAmount(body.amountUsd);
  if (amount.error !== undefined) {
    return NextResponse.json({ success: false, error: amount.error }, { status: 400 });
  }

  const paymentMethod = body.paymentMethod as TopUpPaymentMethod;
  if (!PAYMENT_METHODS.includes(paymentMethod)) {
    return NextResponse.json({ success: false, error: 'Choose a payment method.' }, { status: 400 });
  }

  const airtelReference = typeof body.paymentReference === 'string' ? body.paymentReference.trim().toUpperCase() : '';
  if (paymentMethod === 'AIRTEL_MONEY' && !AIRTEL_REFERENCE_PATTERN.test(airtelReference)) {
    return NextResponse.json({ success: false, error: 'Enter the Airtel Money transaction ID from your SMS.' }, { status: 400 });
  }

  const phone = (typeof body.phone === 'string' && body.phone.trim()) || customer.phone || '';
  const usesFlutterwave = paymentMethod === 'MOBILE_MONEY' || paymentMethod === 'CARD';
  if (usesFlutterwave && !phone) {
    return NextResponse.json({ success: false, error: 'Enter your phone number.' }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const gatewayMissing =
    (paymentMethod !== 'AIRTEL_MONEY' && !baseUrl) ||
    (usesFlutterwave && !process.env.FLUTTERWAVE_SECRET_KEY) ||
    (paymentMethod === 'PAWAPAY' && !process.env.PAWAPAY_API_TOKEN);
  if (gatewayMissing) {
    console.error('Wallet top-up misconfigured: payment gateway key or NEXT_PUBLIC_BASE_URL is missing', { paymentMethod });
    return NextResponse.json(
      { success: false, error: 'This payment method is temporarily unavailable. Please try another.' },
      { status: 500 }
    );
  }

  // Amount and rate are always worked out here — never taken from the
  // client — and locked onto the row so a later rate change can't alter it.
  const usdRate = await getUsdRate(await getShopProfile());
  const amountUgx = topUpUgx(amount.cents, usdRate.rate);
  const txRef = `${TOPUP_TX_REF_PREFIX}${crypto.randomUUID()}`;
  const depositId = paymentMethod === 'PAWAPAY' ? crypto.randomUUID() : null;

  const topUp = await prisma.walletTransaction.create({
    data: {
      customerId: customer.id,
      type: 'TOPUP',
      status: 'PENDING',
      amountCents: amount.cents,
      amountUgx,
      usdRate: usdRate.rate,
      paymentMethod,
      txRef,
      paymentReference: depositId ?? (paymentMethod === 'AIRTEL_MONEY' ? airtelReference : null),
    },
  });

  // Airtel Money direct: stays PENDING until an admin matches the
  // transaction ID against their Airtel SMS/app and approves it.
  if (paymentMethod === 'AIRTEL_MONEY') {
    return NextResponse.json({ success: true, txRef });
  }

  const returnUrl = `${baseUrl}/account/wallet?tx_ref=${txRef}`;
  try {
    const paymentUrl =
      paymentMethod === 'PAWAPAY'
        ? await createPawapayPaymentPage({ depositId: depositId!, amountUgx, returnUrl, reason: 'MS Soft GSM wallet top-up' })
        : await createFlutterwavePayment({
            txRef,
            amountUgx,
            redirectUrl: returnUrl,
            customer: { email: customer.email, name: customer.name || customer.email, phone },
            title: 'MS Soft GSM Wallet Top-up',
            description: 'Wallet credit for unlock & flash tools',
          });
    return NextResponse.json({ success: true, paymentUrl, txRef });
  } catch (error) {
    console.error('Wallet top-up payment start failed', { txRef, paymentMethod, error });
    Sentry.captureException(error, { extra: { txRef, paymentMethod } });
    await failTopUp(topUp.id, 'Payment page could not be started').catch(() => {});
    return NextResponse.json({ success: false, error: 'Unable to start payment. Please try again.' }, { status: 502 });
  }
}

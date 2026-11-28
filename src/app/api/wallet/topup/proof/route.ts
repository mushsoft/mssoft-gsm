import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireCustomerApi } from '@/lib/customerAuth';
import { sendTopUpProofNotification } from '@/lib/email/toolOrderEmails';
import { notifyCustomer } from '@/lib/notifications';
import {
  availableProofMethods,
  detectImageType,
  isProofMethod,
  MAX_PROOF_BYTES,
  paysInUsdt,
  parseProofReference,
  PROOF_METHOD_LABELS,
  proofDestinations,
} from '@/lib/paymentProof';
import { rateLimit } from '@/lib/rateLimit';
import { getShopProfile } from '@/lib/shopProfile';
import { getUsdRate } from '@/lib/usdRate';
import { TOPUP_TX_REF_PREFIX } from '@/lib/wallet';
import { formatUsdCents, parseTopUpAmount, topUpUgx } from '@/lib/walletAmounts';

// A wallet top-up the customer has already paid to our Mobile Money
// merchant code or Binance account, sent with a screenshot of the payment.
// Saved as PENDING; only an admin approving it (after checking the money
// arrived) adds the balance.
export async function POST(req: Request) {
  const customer = await requireCustomerApi();
  if (!customer) {
    return NextResponse.json({ success: false, error: 'Please log in to top up.' }, { status: 401 });
  }

  const { allowed, retryAfterSeconds } = rateLimit(`wallet-topup-proof:${customer.id}`, 6, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many top-up attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
    );
  }

  const form = await req.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ success: false, error: 'Malformed request' }, { status: 400 });
  }

  const method = form.get('method');
  const profile = await getShopProfile();
  if (!isProofMethod(method) || !availableProofMethods(proofDestinations(profile)).includes(method)) {
    return NextResponse.json({ success: false, error: 'Choose a payment method.' }, { status: 400 });
  }

  const amount = parseTopUpAmount(form.get('amountUsd'));
  if (amount.error !== undefined) {
    return NextResponse.json({ success: false, error: amount.error }, { status: 400 });
  }

  const reference = parseProofReference(form.get('reference'));
  if (reference.error) {
    return NextResponse.json({ success: false, error: reference.error }, { status: 400 });
  }

  const file = form.get('proof');
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ success: false, error: 'Add a picture of your payment confirmation.' }, { status: 400 });
  }
  if (file.size > MAX_PROOF_BYTES) {
    return NextResponse.json({ success: false, error: 'That picture is too large. Please use a screenshot.' }, { status: 400 });
  }
  const bytes = new Uint8Array(await file.arrayBuffer());
  const mimeType = detectImageType(bytes);
  if (!mimeType) {
    return NextResponse.json({ success: false, error: 'The proof must be a photo or screenshot (JPG, PNG or WebP).' }, { status: 400 });
  }

  // The same screenshot can't pay for two top-ups.
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (await prisma.paymentProof.findFirst({ where: { sha256 }, select: { id: true } })) {
    return NextResponse.json(
      { success: false, error: 'This screenshot was already sent for another top-up. Please send the one for this payment.' },
      { status: 409 }
    );
  }

  // Mobile Money is paid in UGX at today's rate, locked in like other
  // top-ups. Binance is paid in USDT, one for one with dollars.
  const usdt = paysInUsdt(method);
  const usdRate = usdt ? null : await getUsdRate(profile);
  const amountUgx = usdRate ? topUpUgx(amount.cents, usdRate.rate) : null;

  const topUp = await prisma.walletTransaction.create({
    data: {
      customerId: customer.id,
      type: 'TOPUP',
      status: 'PENDING',
      amountCents: amount.cents,
      amountUgx,
      usdRate: usdRate?.rate ?? null,
      paymentMethod: method,
      txRef: `${TOPUP_TX_REF_PREFIX}${crypto.randomUUID()}`,
      paymentReference: reference.value,
      proof: { create: { mimeType, sizeBytes: bytes.length, sha256, data: bytes } },
    },
  });

  const paid = usdt ? `${(amount.cents / 100).toFixed(2)} USDT` : `UGX ${amountUgx!.toLocaleString('en-US')}`;
  await sendTopUpProofNotification({
    topUpId: topUp.id,
    method: PROOF_METHOD_LABELS[method],
    amount: formatUsdCents(amount.cents),
    paid,
    reference: reference.value,
    customerName: customer.name || customer.email,
    customerEmail: customer.email,
  });
  await notifyCustomer(
    { customerId: customer.id, email: customer.email, name: customer.name },
    {
      title: 'Wallet top-up submitted',
      body: `We've received your ${formatUsdCents(amount.cents)} top-up proof (${PROOF_METHOD_LABELS[method]}, ${paid}). We'll add it to your wallet as soon as we've confirmed the payment.`,
      link: '/account/wallet',
    }
  );

  return NextResponse.json({ success: true, txRef: topUp.txRef });
}

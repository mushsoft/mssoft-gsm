import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";
import { markOrderPaid, markOrderFailed } from "@/lib/orderFulfillment";

const VERIFY_TIMEOUT_MS = 15_000;

// Flutterwave webhook: confirms payment success/failure for orders created
// by /api/checkout. The redirect_url the customer's browser hits after
// paying is not proof of payment (it can be visited without paying, or
// skipped entirely), so order status must only ever change here — after
// re-verifying the transaction directly with Flutterwave's API.
function constantTimeEquals(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function POST(req: Request) {
  const webhookSecretHash = process.env.FLUTTERWAVE_WEBHOOK_SECRET_HASH;
  const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;

  if (!webhookSecretHash || !flutterwaveSecretKey) {
    console.error("Webhook misconfigured: FLUTTERWAVE_WEBHOOK_SECRET_HASH or FLUTTERWAVE_SECRET_KEY is missing");
    return NextResponse.json({ success: false }, { status: 500 });
  }

  const signature = req.headers.get("verif-hash");
  if (!signature || !constantTimeEquals(signature, webhookSecretHash)) {
    return NextResponse.json({ success: false, error: "Invalid signature" }, { status: 401 });
  }

  const payload = await req.json().catch(() => null);
  const txRef: unknown = payload?.data?.tx_ref;
  const transactionId: unknown = payload?.data?.id;

  if (typeof txRef !== "string" || !txRef || (typeof transactionId !== "number" && typeof transactionId !== "string")) {
    return NextResponse.json({ success: false, error: "Malformed webhook payload" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { txRef } });

  if (!order) {
    console.error("Webhook received for unknown order", { txRef });
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
  }

  // Cheap fast-path — the real, race-proof guard is the atomic status
  // transition inside markOrderPaid/markOrderFailed below, which is what
  // actually prevents double-processing when Flutterwave redelivers this
  // webhook (it retries on slow/non-2xx responses).
  if (order.paymentStatus !== "PENDING") {
    return NextResponse.json({ success: true });
  }

  // Never trust the webhook body's status directly — re-verify the
  // transaction against Flutterwave's own API using the secret key. A
  // network error or non-2xx from Flutterwave's *own* verify endpoint here
  // is inconclusive, not proof the payment failed — it must NOT mark the
  // order FAILED (that would be permanent and swallow Flutterwave's later
  // retry, since a non-PENDING order short-circuits above). Returning a
  // 5xx below leaves the order PENDING and asks Flutterwave to retry.
  let verifyResponse: Response;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);
    try {
      verifyResponse = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
        headers: { Authorization: `Bearer ${flutterwaveSecretKey}` },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  } catch (error) {
    console.error("Flutterwave verify request errored (transient, order left PENDING for retry)", { txRef, error });
    Sentry.captureException(error, { extra: { txRef } });
    return NextResponse.json({ success: false, error: "Verification temporarily unavailable" }, { status: 503 });
  }

  if (!verifyResponse.ok) {
    console.error("Flutterwave verify endpoint returned a non-2xx (transient, order left PENDING for retry)", {
      txRef,
      status: verifyResponse.status,
    });
    Sentry.captureMessage("Flutterwave verify endpoint returned a non-2xx", {
      level: "error",
      extra: { txRef, status: verifyResponse.status },
    });
    return NextResponse.json({ success: false, error: "Verification temporarily unavailable" }, { status: 503 });
  }

  const verifyData = await verifyResponse.json().catch(() => null);
  const tx = verifyData?.data;

  if (!verifyData || verifyData.status !== "success" || !tx) {
    console.error("Flutterwave verify response was malformed (transient, order left PENDING for retry)", { txRef, verifyData });
    Sentry.captureMessage("Flutterwave verify response was malformed", { level: "error", extra: { txRef } });
    return NextResponse.json({ success: false, error: "Verification temporarily unavailable" }, { status: 503 });
  }

  // From here on the response was well-formed and authoritative — Flutterwave
  // told us definitively whether this transaction succeeded.
  const isVerified =
    tx.status === "successful" &&
    tx.tx_ref === order.txRef &&
    tx.currency === "UGX" &&
    typeof tx.amount === "number" &&
    tx.amount >= order.totalAmount;

  if (!isVerified) {
    await markOrderFailed(order.id);
    console.error("Flutterwave verification determined the payment did not succeed", { txRef, tx });
    return NextResponse.json({ success: false, error: "Payment could not be verified" }, { status: 400 });
  }

  await markOrderPaid(order.id);

  return NextResponse.json({ success: true });
}

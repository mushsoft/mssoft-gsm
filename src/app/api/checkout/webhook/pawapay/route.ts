import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";
import { markOrderPaid, markOrderFailed } from "@/lib/orderFulfillment";

const VERIFY_TIMEOUT_MS = 15_000;

// pawaPay webhook: confirms payment success/failure for orders created by
// /api/checkout with paymentMethod "PAWAPAY". Mirrors the Flutterwave
// webhook's philosophy exactly — the callback body is never trusted
// directly (pawaPay retries/redelivers callbacks, and a forged POST here
// would otherwise mark any order paid); the deposit's status is always
// re-fetched from pawaPay's own Check Deposit Status endpoint before an
// order is ever marked paid.
export async function POST(req: Request) {
  const pawapayApiToken = process.env.PAWAPAY_API_TOKEN;
  if (!pawapayApiToken) {
    console.error("pawaPay webhook misconfigured: PAWAPAY_API_TOKEN is missing");
    return NextResponse.json({ success: false }, { status: 500 });
  }

  const payload = await req.json().catch(() => null);
  const depositId: unknown = payload?.depositId;

  if (typeof depositId !== "string" || !depositId) {
    return NextResponse.json({ success: false, error: "Malformed webhook payload" }, { status: 400 });
  }

  // paymentReference isn't a unique column (it also holds free-text Airtel
  // Money transaction codes an admin cross-checks by hand), so this is
  // scoped to PAWAPAY orders specifically rather than relying on a DB-level
  // uniqueness guarantee.
  const order = await prisma.order.findFirst({ where: { paymentReference: depositId, paymentMethod: "PAWAPAY" } });

  if (!order) {
    console.error("pawaPay webhook received for unknown deposit", { depositId });
    return NextResponse.json({ success: false, error: "Order not found" }, { status: 404 });
  }

  // Cheap fast-path — the real, race-proof guard is the atomic status
  // transition inside markOrderPaid/markOrderFailed below, which is what
  // actually prevents double-processing when pawaPay redelivers this callback.
  if (order.paymentStatus !== "PENDING") {
    return NextResponse.json({ success: true });
  }

  const base = process.env.PAWAPAY_BASE_URL || "https://api.pawapay.io";
  let statusResponse: Response;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), VERIFY_TIMEOUT_MS);
    try {
      statusResponse = await fetch(`${base}/v2/deposits/${depositId}`, {
        headers: { Authorization: `Bearer ${pawapayApiToken}` },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
  } catch (error) {
    console.error("pawaPay status check errored (transient, order left PENDING for retry)", { depositId, error });
    Sentry.captureException(error, { extra: { depositId, txRef: order.txRef } });
    return NextResponse.json({ success: false, error: "Verification temporarily unavailable" }, { status: 503 });
  }

  if (!statusResponse.ok) {
    console.error("pawaPay status check returned a non-2xx (transient, order left PENDING for retry)", {
      depositId,
      status: statusResponse.status,
    });
    Sentry.captureMessage("pawaPay status check returned a non-2xx", {
      level: "error",
      extra: { depositId, status: statusResponse.status },
    });
    return NextResponse.json({ success: false, error: "Verification temporarily unavailable" }, { status: 503 });
  }

  const statusData = await statusResponse.json().catch(() => null);
  const deposit = statusData?.data;

  if (!statusData || statusData.status !== "FOUND" || !deposit) {
    console.error("pawaPay status check response was malformed (transient, order left PENDING for retry)", {
      depositId,
      statusData,
    });
    Sentry.captureMessage("pawaPay status check response was malformed", { level: "error", extra: { depositId } });
    return NextResponse.json({ success: false, error: "Verification temporarily unavailable" }, { status: 503 });
  }

  // PROCESSING/IN_RECONCILIATION aren't final — leave the order PENDING and
  // let pawaPay's next callback (or our own retry) resolve it later.
  if (deposit.status === "PROCESSING" || deposit.status === "IN_RECONCILIATION") {
    return NextResponse.json({ success: true });
  }

  // From here on the response was well-formed and authoritative — pawaPay
  // told us definitively whether this deposit succeeded.
  const isVerified =
    deposit.status === "COMPLETED" &&
    deposit.depositId === depositId &&
    deposit.currency === "UGX" &&
    Number(deposit.amount) >= order.totalAmount;

  if (!isVerified) {
    await markOrderFailed(order.id);
    console.error("pawaPay verification determined the payment did not succeed", { depositId, deposit });
    return NextResponse.json({ success: false, error: "Payment could not be verified" }, { status: 400 });
  }

  await markOrderPaid(order.id);

  return NextResponse.json({ success: true });
}

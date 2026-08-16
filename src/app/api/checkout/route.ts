import { NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import * as Sentry from "@sentry/nextjs";
import { prisma } from "@/lib/prisma";
import { getOrCreateCustomer } from "@/lib/customerAuth";
import { sendOrderReceivedEmail } from "@/lib/email/orderEmails";
import { markOrderFailed } from "@/lib/orderFulfillment";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

type CheckoutItem = { id: string; quantity: number };

interface CheckoutRequestBody {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  paymentMethod: string;
  items: CheckoutItem[];
  couponCode: string | null;
}

const ALLOWED_PAYMENT_METHODS = ["MOBILE_MONEY", "CARD"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FETCH_TIMEOUT_MS = 15_000;

class CheckoutValidationError extends Error {}

function parseCheckoutBody(body: unknown): CheckoutRequestBody {
  if (typeof body !== "object" || body === null) {
    throw new CheckoutValidationError("Request body must be a JSON object");
  }
  const b = body as Record<string, unknown>;

  const customerName = typeof b.customerName === "string" ? b.customerName.trim() : "";
  const customerPhone = typeof b.customerPhone === "string" ? b.customerPhone.trim() : "";
  const customerEmail = typeof b.customerEmail === "string" ? b.customerEmail.trim() : "";
  const paymentMethod = typeof b.paymentMethod === "string" ? b.paymentMethod.trim() : "";

  if (!customerName) throw new CheckoutValidationError("customerName is required");
  if (!customerPhone) throw new CheckoutValidationError("customerPhone is required");
  if (!customerEmail || !EMAIL_PATTERN.test(customerEmail)) {
    throw new CheckoutValidationError("A valid customerEmail is required");
  }
  if (!ALLOWED_PAYMENT_METHODS.includes(paymentMethod)) {
    throw new CheckoutValidationError(
      `paymentMethod must be one of: ${ALLOWED_PAYMENT_METHODS.join(", ")}`
    );
  }
  if (!Array.isArray(b.items) || b.items.length === 0) {
    throw new CheckoutValidationError("items must be a non-empty array");
  }

  const items: CheckoutItem[] = b.items.map((raw, index) => {
    if (typeof raw !== "object" || raw === null) {
      throw new CheckoutValidationError(`items[${index}] is invalid`);
    }
    const item = raw as Record<string, unknown>;
    const id = typeof item.id === "string" ? item.id : "";
    const quantity = typeof item.quantity === "number" ? item.quantity : NaN;

    if (!id) throw new CheckoutValidationError(`items[${index}].id is required`);
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new CheckoutValidationError(`items[${index}].quantity must be a positive integer`);
    }

    return { id, quantity };
  });

  const couponCode = typeof b.couponCode === "string" && b.couponCode.trim() ? b.couponCode.trim().toUpperCase() : null;

  return { customerName, customerPhone, customerEmail, paymentMethod, items, couponCode };
}

function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  return fetch(url, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer));
}

export async function POST(req: Request) {
  const { allowed, retryAfterSeconds } = rateLimit(`checkout:${getClientIp(req)}`, 10, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: `Too many checkout attempts. Try again in ${retryAfterSeconds}s.` },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  let checkout: CheckoutRequestBody;
  try {
    checkout = parseCheckoutBody(await req.json());
  } catch (error) {
    const message = error instanceof CheckoutValidationError ? error.message : "Malformed request body";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }

  const flutterwaveSecretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!flutterwaveSecretKey || !baseUrl) {
    console.error("Checkout misconfigured: FLUTTERWAVE_SECRET_KEY or NEXT_PUBLIC_BASE_URL is missing");
    return NextResponse.json(
      { success: false, error: "Checkout is temporarily unavailable. Please try again later." },
      { status: 500 }
    );
  }

  // Price and stock are always derived from the database — client-supplied
  // amounts are never trusted, since a tampered request body could otherwise
  // buy real products for an arbitrary price.
  const txRef = `PH-${crypto.randomUUID()}`;
  // Guest checkout stays fully supported — this only attaches the order to
  // an account when the request happens to carry a valid customer session.
  const customer = await getOrCreateCustomer().catch(() => null);
  let order: Prisma.OrderGetPayload<{ include: { items: { include: { product: { select: { title: true } } } } } }>;

  try {
    // Everything below — the coupon reservation and the order itself — runs
    // in one transaction so they commit or roll back together. Reserving
    // the coupon's usedCount here (not at payment confirmation) is what
    // closes the race where many concurrent checkouts could all read the
    // same not-yet-incremented usedCount and all be allowed the discount;
    // the atomic guarded UPDATE below makes each reservation serialize
    // against the others via Postgres's row lock. If the order never gets
    // paid, markOrderFailed() releases the reservation.
    order = await prisma.$transaction(async (tx) => {
      const productIds = [...new Set(checkout.items.map((item) => item.id))];
      const products = await tx.product.findMany({ where: { id: { in: productIds } } });
      const productById = new Map(products.map((product) => [product.id, product]));

      for (const item of checkout.items) {
        const product = productById.get(item.id);
        if (!product) {
          throw new CheckoutValidationError(`Product ${item.id} could not be found`);
        }
        if (product.stock < item.quantity) {
          throw new CheckoutValidationError(`${product.title} only has ${product.stock} unit(s) in stock`);
        }
      }

      const subtotal = checkout.items.reduce(
        (sum, item) => sum + productById.get(item.id)!.price * item.quantity,
        0
      );

      let discountAmount = 0;
      let appliedCouponCode: string | null = null;
      if (checkout.couponCode) {
        const reserved = await tx.coupon.updateMany({
          where: {
            code: checkout.couponCode,
            active: true,
            OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
          },
          data: { usedCount: { increment: 1 } },
        });
        if (reserved.count === 0) {
          throw new CheckoutValidationError("This coupon code is not valid or has expired");
        }

        const coupon = await tx.coupon.findUniqueOrThrow({ where: { code: checkout.couponCode } });
        if (coupon.maxUses !== null && coupon.usedCount > coupon.maxUses) {
          // Lost the race for the last remaining use — throwing here rolls
          // back the increment above along with the rest of the transaction.
          throw new CheckoutValidationError("This coupon has reached its usage limit");
        }

        discountAmount =
          coupon.discountType === "PERCENT" ? Math.round(subtotal * (coupon.value / 100)) : coupon.value;
        discountAmount = Math.min(discountAmount, subtotal);
        appliedCouponCode = coupon.code;
      }

      const totalAmount = subtotal - discountAmount;

      return tx.order.create({
        data: {
          customerName: checkout.customerName,
          customerPhone: checkout.customerPhone,
          customerEmail: checkout.customerEmail,
          totalAmount,
          paymentMethod: checkout.paymentMethod,
          txRef,
          customerId: customer?.id ?? null,
          couponCode: appliedCouponCode,
          discountAmount,
          items: {
            create: checkout.items.map((item) => ({
              productId: item.id,
              quantity: item.quantity,
              price: productById.get(item.id)!.price,
            })),
          },
        },
        include: { items: { include: { product: { select: { title: true } } } } },
      });
    });
  } catch (error) {
    if (error instanceof CheckoutValidationError) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
    console.error("Checkout failed while loading products or creating the order", { txRef, error });
    Sentry.captureException(error, { extra: { txRef } });
    return NextResponse.json(
      { success: false, error: "Unable to process your order right now. Please try again." },
      { status: 500 }
    );
  }

  // The order is already committed at this point — an email failure here
  // must never surface as "checkout failed" to the customer, since that
  // would make them retry and create a duplicate order.
  await sendOrderReceivedEmail({
    customerName: checkout.customerName,
    customerEmail: checkout.customerEmail,
    txRef,
    totalAmount: order.totalAmount,
    discountAmount: order.discountAmount ?? 0,
    items: order.items.map((item) => ({ title: item.product.title, quantity: item.quantity, price: item.price })),
  }).catch((error) => console.error("Failed to send order-received email (order already created)", { txRef, error }));

  // Stock is only decremented once Flutterwave confirms payment via the
  // webhook (see /api/checkout/webhook) — never at initiation, otherwise an
  // abandoned or failed payment would still lock up real inventory.
  try {
    const response = await fetchWithTimeout(
      "https://api.flutterwave.com/v3/payments",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${flutterwaveSecretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tx_ref: txRef,
          amount: order.totalAmount,
          currency: "UGX",
          redirect_url: `${baseUrl}/order-confirmation?tx_ref=${txRef}`,
          customer: {
            email: checkout.customerEmail,
            phonenumber: checkout.customerPhone,
            name: checkout.customerName,
          },
          customizations: {
            title: "Phone Hub Purchase",
            description: "Payment for phones/spares/tools",
          },
        }),
      },
      FETCH_TIMEOUT_MS
    );

    const data = await response.json();

    if (!response.ok || data.status !== "success" || !data.data?.link) {
      throw new Error(data?.message || `Flutterwave rejected the payment request (${response.status})`);
    }

    return NextResponse.json({ success: true, paymentUrl: data.data.link, txRef });
  } catch (error) {
    console.error("Flutterwave payment initialization failed", { txRef, error });
    Sentry.captureException(error, { extra: { txRef, orderId: order.id } });
    await markOrderFailed(order.id).catch((releaseError) =>
      console.error("Failed to mark order failed / release coupon after init failure", { txRef, releaseError })
    );
    return NextResponse.json(
      { success: false, error: "Unable to start payment. Please try again." },
      { status: 502 }
    );
  }
}

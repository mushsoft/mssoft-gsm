import { prisma } from './prisma';
import { sendPaymentConfirmedEmail } from './email/orderEmails';

// Shared by the Flutterwave webhook (automatic) and the admin "Mark as
// Paid"/"Mark as Failed" actions (manual, e.g. cash/in-person payments or
// cancelling a stuck order) so the atomic status-transition + stock/coupon
// logic never drifts between paths.
//
// The status transition itself is the concurrency guard: `updateMany` with
// `paymentStatus: 'PENDING'` in the WHERE clause only ever affects a row
// once — a second concurrent call (Flutterwave webhook retry racing an
// admin click, or two webhook deliveries for the same payment) sees
// `count === 0` and becomes a safe no-op instead of double-decrementing
// stock, double-sending emails, or double-touching the coupon. Everything
// happens inside one interactive transaction so the guard and its
// consequences (stock decrement, coupon release) commit or roll back
// together — never partially applied.

export async function markOrderPaid(orderId: string): Promise<{ transitioned: boolean }> {
  const order = await prisma.$transaction(async (tx) => {
    const updateResult = await tx.order.updateMany({
      where: { id: orderId, paymentStatus: 'PENDING' },
      data: { paymentStatus: 'SUCCESSFUL' },
    });
    if (updateResult.count === 0) return null;

    const fullOrder = await tx.order.findUniqueOrThrow({
      where: { id: orderId },
      include: { items: { include: { product: true } } },
    });

    // Sequential, not Promise.all — concurrent Prisma queries over the
    // shared pooled connection have triggered a Postgres protocol error in
    // this environment (see ReviewsSection.tsx, adminDashboard.ts).
    for (const item of fullOrder.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { decrement: item.quantity } },
      });
    }

    return fullOrder;
  });

  if (!order) return { transitioned: false };

  // The order is already committed as paid at this point — an email
  // failure here (Resend hiccup, bad key) must never look like the payment
  // itself failed. Log and move on.
  await sendPaymentConfirmedEmail({
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    txRef: order.txRef,
    totalAmount: order.totalAmount,
    discountAmount: order.discountAmount ?? undefined,
    items: order.items.map((item) => ({ title: item.product.title, quantity: item.quantity, price: item.price })),
  }).catch((error) =>
    console.error('Failed to send payment-confirmed email (order already marked paid)', { orderId, error })
  );

  return { transitioned: true };
}

// Releases a coupon reservation made at checkout time (see /api/checkout)
// when an order that used it never ends up paid — an abandoned or declined
// payment shouldn't permanently burn a limited-use code.
export async function markOrderFailed(orderId: string): Promise<{ transitioned: boolean }> {
  const result = await prisma.$transaction(async (tx) => {
    const updateResult = await tx.order.updateMany({
      where: { id: orderId, paymentStatus: 'PENDING' },
      data: { paymentStatus: 'FAILED' },
    });
    if (updateResult.count === 0) return { transitioned: false };

    const order = await tx.order.findUniqueOrThrow({ where: { id: orderId }, select: { couponCode: true } });
    if (order.couponCode) {
      await tx.coupon.update({ where: { code: order.couponCode }, data: { usedCount: { decrement: 1 } } });
    }
    return { transitioned: true };
  });

  return result;
}

// Admin-only: reverses a confirmed payment. Restocks the items (mirroring
// the decrement markOrderPaid applied) but deliberately does NOT release
// the coupon reservation — the discount was genuinely redeemed once, a
// later refund doesn't retroactively free up that use.
export async function markOrderRefunded(orderId: string): Promise<{ transitioned: boolean }> {
  const order = await prisma.$transaction(async (tx) => {
    const updateResult = await tx.order.updateMany({
      where: { id: orderId, paymentStatus: 'SUCCESSFUL' },
      data: { paymentStatus: 'REFUNDED' },
    });
    if (updateResult.count === 0) return null;

    const fullOrder = await tx.order.findUniqueOrThrow({ where: { id: orderId }, include: { items: true } });

    for (const item of fullOrder.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: item.quantity } },
      });
    }

    return fullOrder;
  });

  return { transitioned: Boolean(order) };
}

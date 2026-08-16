// Integration tests — these hit the real local dev Postgres database (via
// the same prisma client the app uses) rather than mocking Prisma, because
// what's actually under test is the atomic guard itself: does the
// `updateMany({ where: { paymentStatus: 'PENDING' } })` transition really
// only ever succeed once, decrementing stock exactly once, no matter how
// many times it's invoked for the same order? A mocked Prisma client would
// just replay whatever behavior we told it to — it can't tell us whether
// the guard is real. Requires the local `prisma dev` database to be running.
import { describe, it, expect, afterEach } from 'vitest';
import { prisma } from './prisma';
import { markOrderPaid, markOrderFailed, markOrderRefunded } from './orderFulfillment';

const TEST_MARKER = 'ORDERFULFILLMENT_TEST';

async function createTestProduct(stock: number) {
  return prisma.product.create({
    data: {
      title: `${TEST_MARKER} Product`,
      slug: `${TEST_MARKER.toLowerCase()}-${crypto.randomUUID()}`,
      description: 'test',
      price: 10_000,
      stock,
      category: 'ACCESSORY',
      brand: 'Test',
      images: [],
    },
  });
}

async function createTestOrder(productId: string, quantity: number, couponCode: string | null = null) {
  return prisma.order.create({
    data: {
      customerName: TEST_MARKER,
      customerPhone: '+256700000000',
      customerEmail: 'orderfulfillment-test@example.com',
      totalAmount: 10_000 * quantity,
      paymentMethod: 'CARD',
      txRef: `${TEST_MARKER}-${crypto.randomUUID()}`,
      couponCode,
      items: { create: [{ productId, quantity, price: 10_000 }] },
    },
  });
}

afterEach(async () => {
  // Order rows cascade-delete their OrderItems; products/coupons are
  // deleted after so no FK constraint blocks it.
  await prisma.order.deleteMany({ where: { customerName: TEST_MARKER } });
  await prisma.product.deleteMany({ where: { title: `${TEST_MARKER} Product` } });
  await prisma.coupon.deleteMany({ where: { code: { startsWith: TEST_MARKER } } });
});

describe('markOrderPaid', () => {
  it('decrements stock and transitions PENDING -> SUCCESSFUL', async () => {
    const product = await createTestProduct(5);
    const order = await createTestOrder(product.id, 2);

    const result = await markOrderPaid(order.id);
    expect(result.transitioned).toBe(true);

    const updatedOrder = await prisma.order.findUniqueOrThrow({ where: { id: order.id } });
    const updatedProduct = await prisma.product.findUniqueOrThrow({ where: { id: product.id } });
    expect(updatedOrder.paymentStatus).toBe('SUCCESSFUL');
    expect(updatedProduct.stock).toBe(3);
  });

  it('is a no-op the second time — stock is never decremented twice', async () => {
    const product = await createTestProduct(5);
    const order = await createTestOrder(product.id, 2);

    const first = await markOrderPaid(order.id);
    const second = await markOrderPaid(order.id);

    expect(first.transitioned).toBe(true);
    expect(second.transitioned).toBe(false);

    const updatedProduct = await prisma.product.findUniqueOrThrow({ where: { id: product.id } });
    // Would be 1 if the guard failed and both calls decremented.
    expect(updatedProduct.stock).toBe(3);
  });
});

describe('markOrderFailed', () => {
  it('releases a reserved coupon use', async () => {
    const coupon = await prisma.coupon.create({
      data: { code: `${TEST_MARKER}_COUPON`, discountType: 'FIXED', value: 1000, usedCount: 1 },
    });
    const product = await createTestProduct(5);
    const order = await createTestOrder(product.id, 1, coupon.code);

    const result = await markOrderFailed(order.id);
    expect(result.transitioned).toBe(true);

    const updatedCoupon = await prisma.coupon.findUniqueOrThrow({ where: { code: coupon.code } });
    expect(updatedCoupon.usedCount).toBe(0);
  });

  it('is a no-op if the order is not PENDING', async () => {
    const product = await createTestProduct(5);
    const order = await createTestOrder(product.id, 1);
    await markOrderPaid(order.id);

    const result = await markOrderFailed(order.id);
    expect(result.transitioned).toBe(false);

    const updatedOrder = await prisma.order.findUniqueOrThrow({ where: { id: order.id } });
    expect(updatedOrder.paymentStatus).toBe('SUCCESSFUL');
  });
});

describe('markOrderRefunded', () => {
  it('restocks items and transitions SUCCESSFUL -> REFUNDED', async () => {
    const product = await createTestProduct(5);
    const order = await createTestOrder(product.id, 2);
    await markOrderPaid(order.id);

    const result = await markOrderRefunded(order.id);
    expect(result.transitioned).toBe(true);

    const updatedOrder = await prisma.order.findUniqueOrThrow({ where: { id: order.id } });
    const updatedProduct = await prisma.product.findUniqueOrThrow({ where: { id: product.id } });
    expect(updatedOrder.paymentStatus).toBe('REFUNDED');
    expect(updatedProduct.stock).toBe(5); // back to original after -2 then +2
  });

  it('refuses to refund an order that was never paid', async () => {
    const product = await createTestProduct(5);
    const order = await createTestOrder(product.id, 1);

    const result = await markOrderRefunded(order.id);
    expect(result.transitioned).toBe(false);
  });
});

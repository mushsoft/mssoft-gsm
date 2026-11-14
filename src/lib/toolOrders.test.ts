// Integration tests against the local dev Postgres (see wallet.test.ts):
// purchases must never overdraw or charge for an invalid order, and a
// refund must return the money exactly once.
import { describe, it, expect, afterEach } from 'vitest';
import { prisma } from './prisma';
import { completeToolOrder, purchaseTool, refundToolOrder, ToolOrderError } from './toolOrders';

const TEST_MARKER = 'TOOLORDER_TEST';

async function createCustomer(balanceCents: number) {
  const id = crypto.randomUUID();
  return prisma.customer.create({
    data: {
      supabaseUserId: `${TEST_MARKER}-${id}`,
      email: `${TEST_MARKER.toLowerCase()}-${id}@example.com`,
      walletBalanceCents: balanceCents,
    },
  });
}

// Real titles from the live listing so the order-form rules apply as in production.
async function createPerCreditTool() {
  // 1.4 credits × 1.5 markup = $2.10 per credit
  return prisma.softwareTool.create({
    data: { category: `${TEST_MARKER} Hydra Tool`, title: 'Hydra Any Quantity Credits', creditCost: 1.4 },
  });
}
async function createFixedTool() {
  // 107.9 × 1.5 = $161.85
  return prisma.softwareTool.create({
    data: { category: `${TEST_MARKER} Chimera Tool`, title: 'Chimera Tool Basic (100 Devices / 1 Year)', creditCost: 107.9 },
  });
}

async function balanceOf(customerId: string) {
  return (await prisma.customer.findUniqueOrThrow({ where: { id: customerId } })).walletBalanceCents;
}

async function ledgerSum(customerId: string) {
  const sum = await prisma.walletTransaction.aggregate({
    _sum: { amountCents: true },
    where: { customerId, status: 'COMPLETED' },
  });
  return sum._sum.amountCents ?? 0;
}

afterEach(async () => {
  const customers = await prisma.customer.findMany({
    where: { supabaseUserId: { startsWith: TEST_MARKER } },
    select: { id: true },
  });
  const ids = customers.map((c) => c.id);
  await prisma.walletTransaction.deleteMany({ where: { customerId: { in: ids } } });
  await prisma.toolOrder.deleteMany({ where: { customerId: { in: ids } } });
  await prisma.customer.deleteMany({ where: { id: { in: ids } } });
  await prisma.softwareTool.deleteMany({ where: { category: { startsWith: TEST_MARKER } } });
});

describe('purchaseTool', () => {
  it('charges a fixed-price tool at the server-side price and records it', async () => {
    const customer = await createCustomer(20000);
    const tool = await createFixedTool();

    const order = await purchaseTool(customer.id, tool.id, { details: { username: 'techguy' } });

    expect(order.totalCents).toBe(16185);
    expect(order.status).toBe('PAID');
    expect(await balanceOf(customer.id)).toBe(20000 - 16185);
    const ledger = await prisma.walletTransaction.findMany({ where: { toolOrderId: order.id } });
    expect(ledger).toHaveLength(1);
    expect(ledger[0]).toMatchObject({ type: 'PURCHASE', status: 'COMPLETED', amountCents: -16185 });
  });

  it('prices per-credit products by quantity', async () => {
    const customer = await createCustomer(50000);
    const tool = await createPerCreditTool();

    const order = await purchaseTool(customer.id, tool.id, { quantity: '100', details: { email: 'tech@example.com' } });

    expect(order).toMatchObject({ perCredit: true, quantity: 100, unitPriceCents: 210, totalCents: 21000 });
    expect(await balanceOf(customer.id)).toBe(29000);
  });

  it('refuses when the balance is too low, without charging or creating an order', async () => {
    const customer = await createCustomer(16184); // one cent short
    const tool = await createFixedTool();

    await expect(purchaseTool(customer.id, tool.id, { details: { username: 'techguy' } })).rejects.toMatchObject({
      status: 402,
    });
    expect(await balanceOf(customer.id)).toBe(16184);
    expect(await prisma.toolOrder.count({ where: { customerId: customer.id } })).toBe(0);
  });

  it('rejects invalid order details before charging anything', async () => {
    const customer = await createCustomer(50000);
    const tool = await createPerCreditTool();

    await expect(purchaseTool(customer.id, tool.id, { quantity: '10', details: {} })).rejects.toBeInstanceOf(ToolOrderError);
    await expect(
      purchaseTool(customer.id, tool.id, { quantity: '0', details: { email: 'tech@example.com' } })
    ).rejects.toBeInstanceOf(ToolOrderError);
    expect(await balanceOf(customer.id)).toBe(50000);
  });

  // Needs a real Postgres — the local prisma dev DB is single-connection.
  it.skipIf(!process.env.TEST_DB_CONCURRENT)('never overdraws under concurrent purchases', async () => {
    const customer = await createCustomer(20000); // enough for exactly one
    const tool = await createFixedTool();

    const results = await Promise.allSettled(
      Array.from({ length: 5 }, () => purchaseTool(customer.id, tool.id, { details: { username: 'techguy' } }))
    );
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(1);
    expect(await balanceOf(customer.id)).toBe(20000 - 16185);
  });
});

describe('refundToolOrder / completeToolOrder', () => {
  it('refunds exactly once and records it', async () => {
    const customer = await createCustomer(20000);
    const tool = await createFixedTool();
    const order = await purchaseTool(customer.id, tool.id, { details: { username: 'techguy' } });

    expect(await refundToolOrder(order.id, 'Supplier down')).toEqual({ transitioned: true });
    expect(await refundToolOrder(order.id, null)).toEqual({ transitioned: false });

    expect(await balanceOf(customer.id)).toBe(20000);
    const refunded = await prisma.toolOrder.findUniqueOrThrow({ where: { id: order.id } });
    expect(refunded).toMatchObject({ status: 'REFUNDED', adminNote: 'Supplier down' });
  });

  it('a completed order cannot be refunded, and a refunded one cannot be completed', async () => {
    const customer = await createCustomer(40000);
    const tool = await createFixedTool();

    const done = await purchaseTool(customer.id, tool.id, { details: { username: 'techguy' } });
    expect(await completeToolOrder(done.id, 'Loaded')).toEqual({ transitioned: true });
    expect(await refundToolOrder(done.id, null)).toEqual({ transitioned: false });

    const refunded = await purchaseTool(customer.id, tool.id, { details: { username: 'techguy' } });
    await refundToolOrder(refunded.id, null);
    expect(await completeToolOrder(refunded.id, null)).toEqual({ transitioned: false });

    expect(await balanceOf(customer.id)).toBe(40000 - 16185);
  });

  it('keeps the balance equal to the sum of the ledger', async () => {
    const customer = await createCustomer(0);
    // Seed the balance through a real top-up row so the ledger starts in step.
    await prisma.walletTransaction.create({
      data: { customerId: customer.id, type: 'TOPUP', status: 'COMPLETED', amountCents: 60000, txRef: `WT-${TEST_MARKER}-${crypto.randomUUID()}` },
    });
    await prisma.customer.update({ where: { id: customer.id }, data: { walletBalanceCents: 60000 } });

    const fixed = await createFixedTool();
    const perCredit = await createPerCreditTool();
    const a = await purchaseTool(customer.id, fixed.id, { details: { username: 'techguy' } });
    await purchaseTool(customer.id, perCredit.id, { quantity: '50', details: { email: 'tech@example.com' } });
    await refundToolOrder(a.id, null);

    expect(await balanceOf(customer.id)).toBe(await ledgerSum(customer.id));
    expect(await balanceOf(customer.id)).toBe(60000 - 50 * 210);
  });
});

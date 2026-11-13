// Integration tests against the real local dev Postgres (same reasoning as
// orderFulfillment.test.ts): what's under test is the atomic PENDING guard —
// a top-up must credit the balance exactly once no matter how many times or
// how concurrently it's confirmed. Requires the local `prisma dev` database.
import { describe, it, expect, afterEach } from 'vitest';
import { prisma } from './prisma';
import { availableTopUpMethods, completeTopUp, failTopUp } from './wallet';

const TEST_MARKER = 'WALLET_TEST';

async function createTestCustomer() {
  const id = crypto.randomUUID();
  return prisma.customer.create({
    data: { supabaseUserId: `${TEST_MARKER}-${id}`, email: `${TEST_MARKER.toLowerCase()}-${id}@example.com` },
  });
}

async function createTopUp(customerId: string, amountCents: number, paymentMethod = 'PAWAPAY') {
  return prisma.walletTransaction.create({
    data: {
      customerId,
      type: 'TOPUP',
      amountCents,
      amountUgx: amountCents * 42,
      usdRate: 4200,
      paymentMethod,
      txRef: `WT-${TEST_MARKER}-${crypto.randomUUID()}`,
    },
  });
}

async function balanceOf(customerId: string) {
  return (await prisma.customer.findUniqueOrThrow({ where: { id: customerId } })).walletBalanceCents;
}

afterEach(async () => {
  await prisma.walletTransaction.deleteMany({ where: { txRef: { startsWith: `WT-${TEST_MARKER}` } } });
  await prisma.customer.deleteMany({ where: { supabaseUserId: { startsWith: TEST_MARKER } } });
});

describe('completeTopUp', () => {
  it('credits the balance and marks the top-up completed', async () => {
    const customer = await createTestCustomer();
    const topUp = await createTopUp(customer.id, 2000);

    expect(await completeTopUp(topUp.id)).toEqual({ transitioned: true });
    expect(await balanceOf(customer.id)).toBe(2000);
    const row = await prisma.walletTransaction.findUniqueOrThrow({ where: { id: topUp.id } });
    expect(row.status).toBe('COMPLETED');
    expect(row.completedAt).not.toBeNull();
  });

  it('is a no-op the second time — never credits twice', async () => {
    const customer = await createTestCustomer();
    const topUp = await createTopUp(customer.id, 2000);

    await completeTopUp(topUp.id);
    expect(await completeTopUp(topUp.id)).toEqual({ transitioned: false });
    expect(await balanceOf(customer.id)).toBe(2000);
  });

  // The local `prisma dev` database is single-connection and drops
  // connections under concurrent interactive transactions, so this only runs
  // against a real Postgres: TEST_DB_CONCURRENT=1 npx vitest run wallet
  it.skipIf(!process.env.TEST_DB_CONCURRENT)('credits exactly once under concurrent confirmations', async () => {
    const customer = await createTestCustomer();
    const topUp = await createTopUp(customer.id, 1500);

    const results = await Promise.all(Array.from({ length: 5 }, () => completeTopUp(topUp.id)));
    expect(results.filter((r) => r.transitioned)).toHaveLength(1);
    expect(await balanceOf(customer.id)).toBe(1500);
  });

  it('adds separate top-ups together', async () => {
    const customer = await createTestCustomer();
    await completeTopUp((await createTopUp(customer.id, 1000)).id);
    await completeTopUp((await createTopUp(customer.id, 550)).id);
    expect(await balanceOf(customer.id)).toBe(1550);
  });
});

describe('failTopUp', () => {
  it('marks a pending top-up failed without touching the balance', async () => {
    const customer = await createTestCustomer();
    const topUp = await createTopUp(customer.id, 2000);

    expect(await failTopUp(topUp.id, 'test')).toEqual({ transitioned: true });
    expect(await balanceOf(customer.id)).toBe(0);
    const row = await prisma.walletTransaction.findUniqueOrThrow({ where: { id: topUp.id } });
    expect(row.status).toBe('FAILED');
    expect(row.note).toBe('test');
  });

  it('a failed top-up can no longer be completed, and a completed one cannot be failed', async () => {
    const customer = await createTestCustomer();
    const failed = await createTopUp(customer.id, 2000);
    await failTopUp(failed.id);
    expect(await completeTopUp(failed.id)).toEqual({ transitioned: false });

    const completed = await createTopUp(customer.id, 700);
    await completeTopUp(completed.id);
    expect(await failTopUp(completed.id)).toEqual({ transitioned: false });

    expect(await balanceOf(customer.id)).toBe(700);
  });
});

describe('availableTopUpMethods', () => {
  const KEYS = ['NEXT_PUBLIC_BASE_URL', 'PAWAPAY_API_TOKEN', 'FLUTTERWAVE_SECRET_KEY', 'FLUTTERWAVE_WEBHOOK_SECRET_HASH'];

  function withEnv(values: Record<string, string | undefined>, fn: () => void) {
    const saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));
    for (const k of KEYS) {
      if (values[k] === undefined) delete process.env[k];
      else process.env[k] = values[k];
    }
    try {
      fn();
    } finally {
      for (const k of KEYS) {
        if (saved[k] === undefined) delete process.env[k];
        else process.env[k] = saved[k];
      }
    }
  }

  it('never offers Flutterwave without its webhook secret (payments could not be confirmed)', () => {
    withEnv({ NEXT_PUBLIC_BASE_URL: 'https://x', PAWAPAY_API_TOKEN: 't', FLUTTERWAVE_SECRET_KEY: 'k' }, () => {
      expect(availableTopUpMethods()).toEqual(['PAWAPAY', 'AIRTEL_MONEY']);
    });
  });

  it('offers every method when everything is configured', () => {
    withEnv(
      { NEXT_PUBLIC_BASE_URL: 'https://x', PAWAPAY_API_TOKEN: 't', FLUTTERWAVE_SECRET_KEY: 'k', FLUTTERWAVE_WEBHOOK_SECRET_HASH: 'h' },
      () => expect(availableTopUpMethods()).toEqual(['PAWAPAY', 'MOBILE_MONEY', 'CARD', 'AIRTEL_MONEY'])
    );
  });

  it('always keeps admin-approved Airtel Money', () => {
    withEnv({}, () => expect(availableTopUpMethods()).toEqual(['AIRTEL_MONEY']));
  });
});

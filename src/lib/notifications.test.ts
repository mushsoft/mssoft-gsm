// Integration tests against the local dev Postgres (see wallet.test.ts).
// Emails aren't configured in tests, so only the inbox side is checked.
import { describe, it, expect, afterEach } from 'vitest';
import { prisma } from './prisma';
import { notifyCustomer } from './notifications';
import { completeTopUp, failTopUp } from './wallet';

const TEST_MARKER = 'NOTIFY_TEST';

async function createCustomer() {
  const id = crypto.randomUUID();
  return prisma.customer.create({
    data: { supabaseUserId: `${TEST_MARKER}-${id}`, email: `${TEST_MARKER.toLowerCase()}-${id}@example.com` },
  });
}

async function createTopUp(customerId: string) {
  return prisma.walletTransaction.create({
    data: { customerId, type: 'TOPUP', amountCents: 2000, amountUgx: 84000, usdRate: 4200, paymentMethod: 'AIRTEL_MONEY', txRef: `WT-${TEST_MARKER}-${crypto.randomUUID()}` },
  });
}

afterEach(async () => {
  const ids = (await prisma.customer.findMany({ where: { supabaseUserId: { startsWith: TEST_MARKER } }, select: { id: true } })).map(
    (c) => c.id
  );
  await prisma.notification.deleteMany({ where: { customerId: { in: ids } } });
  await prisma.walletTransaction.deleteMany({ where: { customerId: { in: ids } } });
  await prisma.customer.deleteMany({ where: { id: { in: ids } } });
});

describe('notifyCustomer', () => {
  it('saves an unread inbox message for a customer with an account', async () => {
    const customer = await createCustomer();
    await notifyCustomer({ customerId: customer.id, email: customer.email }, { title: 'Hello', body: 'Test', link: '/account' });

    const [message] = await prisma.notification.findMany({ where: { customerId: customer.id } });
    expect(message).toMatchObject({ title: 'Hello', body: 'Test', link: '/account', readAt: null });
  });

  it('does nothing in the inbox for guests and never throws', async () => {
    await expect(notifyCustomer({ customerId: null, email: 'guest@example.com' }, { title: 'Hi', body: 'x' })).resolves.toBeUndefined();
  });
});

describe('wallet top-up notices', () => {
  it('tells the customer when a top-up is credited', async () => {
    const customer = await createCustomer();
    await completeTopUp((await createTopUp(customer.id)).id);

    const titles = (await prisma.notification.findMany({ where: { customerId: customer.id } })).map((n) => n.title);
    expect(titles).toEqual(['Wallet top-up received']);
  });

  it('tells the customer when a top-up fails, unless asked not to', async () => {
    const customer = await createCustomer();
    await failTopUp((await createTopUp(customer.id)).id, 'rejected');
    await failTopUp((await createTopUp(customer.id)).id, 'page failed', { notify: false });

    const titles = (await prisma.notification.findMany({ where: { customerId: customer.id } })).map((n) => n.title);
    expect(titles).toEqual(['Wallet top-up not completed']);
  });

  it('a second confirmation of the same top-up sends no second notice', async () => {
    const customer = await createCustomer();
    const topUp = await createTopUp(customer.id);
    await completeTopUp(topUp.id);
    await completeTopUp(topUp.id);

    expect(await prisma.notification.count({ where: { customerId: customer.id } })).toBe(1);
  });
});

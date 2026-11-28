// Integration test of the screenshot top-up route against the local
// `prisma dev` database: the proof is stored privately, credits nothing
// until approved, and the same screenshot can't be used twice.
import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { prisma } from './prisma';
import { completeTopUp } from './wallet';

const TEST_MARKER = 'PROOF_TEST';
let current: { id: string; email: string; name: string | null } | null = null;

vi.mock('@/lib/customerAuth', () => ({ requireCustomerApi: async () => current }));
vi.mock('@/lib/notifications', () => ({ notifyCustomer: async () => {}, notifyCustomerById: async () => {} }));
vi.mock('@/lib/email/toolOrderEmails', () => ({ sendTopUpProofNotification: async () => {} }));
vi.mock('@/lib/usdRate', () => ({ getUsdRate: async () => ({ rate: 4000 }) }));

const { POST } = await import('@/app/api/wallet/topup/proof/route');

const jpeg = (seed: string) => new Uint8Array([0xff, 0xd8, 0xff, 0xe0, ...new TextEncoder().encode(seed)]);

function send(fields: Record<string, string>, file?: Uint8Array, type = 'image/jpeg') {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.set(k, v);
  if (file) form.set('proof', new Blob([file], { type }), 'proof.jpg');
  return POST(new Request('http://x/api/wallet/topup/proof', { method: 'POST', body: form }));
}

beforeAll(async () => {
  const profile = await prisma.shopProfile.findFirst();
  if (profile && !profile.binancePayId) {
    await prisma.shopProfile.update({ where: { id: profile.id }, data: { binancePayId: '1054278311' } });
  }
});

afterEach(async () => {
  const where = { customer: { supabaseUserId: { startsWith: TEST_MARKER } } };
  await prisma.walletTransaction.deleteMany({ where });
  await prisma.customer.deleteMany({ where: { supabaseUserId: { startsWith: TEST_MARKER } } });
});

async function login() {
  const id = crypto.randomUUID();
  const c = await prisma.customer.create({
    data: { supabaseUserId: `${TEST_MARKER}-${id}`, email: `${TEST_MARKER.toLowerCase()}-${id}@example.com` },
  });
  current = { id: c.id, email: c.email, name: null };
  return c;
}

describe('screenshot top-ups', () => {
  it('stores the proof, credits only on approval, and refuses the same screenshot twice', async () => {
    const c = await login();
    const seed = crypto.randomUUID();

    const res = await send({ method: 'AIRTEL_MERCHANT', amountUsd: '10', reference: 'mp123.456' }, jpeg(seed));
    expect(res.status).toBe(200);
    const row = await prisma.walletTransaction.findFirstOrThrow({ where: { customerId: c.id }, include: { proof: true } });
    expect(row).toMatchObject({ status: 'PENDING', amountCents: 1000, amountUgx: 40000, paymentMethod: 'AIRTEL_MERCHANT', paymentReference: 'MP123.456' });
    expect(row.proof?.mimeType).toBe('image/jpeg');
    expect((await prisma.customer.findUniqueOrThrow({ where: { id: c.id } })).walletBalanceCents).toBe(0);

    expect((await send({ method: 'AIRTEL_MERCHANT', amountUsd: '10' }, jpeg(seed))).status).toBe(409);

    await completeTopUp(row.id);
    expect((await prisma.customer.findUniqueOrThrow({ where: { id: c.id } })).walletBalanceCents).toBe(1000);
  });

  it('takes Binance in USDT with no shillings', async () => {
    const c = await login();
    expect((await send({ method: 'BINANCE', amountUsd: '25.50' }, jpeg(crypto.randomUUID()))).status).toBe(200);
    const row = await prisma.walletTransaction.findFirstOrThrow({ where: { customerId: c.id } });
    expect(row).toMatchObject({ amountCents: 2550, amountUgx: null, paymentMethod: 'BINANCE' });
  });

  it('rejects a missing proof, a non-image, and an unknown method', async () => {
    await login();
    expect((await send({ method: 'AIRTEL_MERCHANT', amountUsd: '10' })).status).toBe(400);
    const svg = new TextEncoder().encode('<svg xmlns="http://www.w3.org/2000/svg"/>');
    expect((await send({ method: 'AIRTEL_MERCHANT', amountUsd: '10' }, svg, 'image/jpeg')).status).toBe(400);
    expect((await send({ method: 'AIRTEL_MONEY', amountUsd: '10' }, jpeg(crypto.randomUUID()))).status).toBe(400);
  });

  it('needs a logged-in customer', async () => {
    current = null;
    expect((await send({ method: 'BINANCE', amountUsd: '10' }, jpeg('x'))).status).toBe(401);
  });
});

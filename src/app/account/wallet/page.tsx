import { Wallet } from 'lucide-react';
import { requireCustomerPage } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import { getShopProfile } from '@/lib/shopProfile';
import { getUsdRate } from '@/lib/usdRate';
import { availableTopUpMethods } from '@/lib/wallet';
import { formatUsdCents } from '@/lib/walletAmounts';
import { formatDate } from '@/lib/formatDate';
import AccountLogoutButton from '@/components/account/AccountLogoutButton';
import AccountNav from '@/components/account/AccountNav';
import WalletTopUpForm from '@/components/account/WalletTopUpForm';
import AutoRefresh from '@/components/AutoRefresh';

export const metadata = { title: 'My Wallet' };

const TYPE_LABELS = { TOPUP: 'Top-up', PURCHASE: 'Purchase', REFUND: 'Refund', ADJUSTMENT: 'Adjustment' } as const;
const METHOD_LABELS: Record<string, string> = {
  PAWAPAY: 'pawaPay',
  MOBILE_MONEY: 'Mobile Money',
  CARD: 'Card',
  AIRTEL_MONEY: 'Airtel Money',
};
const STATUS_STYLES = {
  PENDING: 'bg-amber-500/10 text-amber-500',
  COMPLETED: 'bg-emerald-500/10 text-emerald-500',
  FAILED: 'bg-red-500/10 text-red-500',
} as const;
// A gateway top-up still pending after this long was almost certainly
// abandoned — stop auto-refreshing for it.
const WATCH_PENDING_MS = 30 * 60 * 1000;
function isAwaitingGateway(t: { status: string; paymentMethod: string | null; createdAt: Date }): boolean {
  return t.status === 'PENDING' && t.paymentMethod !== 'AIRTEL_MONEY' && Date.now() - t.createdAt.getTime() < WATCH_PENDING_MS;
}

export default async function WalletPage({ searchParams }: { searchParams: Promise<{ tx_ref?: string }> }) {
  const customer = await requireCustomerPage();
  const { tx_ref: returnedTxRef } = await searchParams;

  const [profile, transactions] = await Promise.all([
    getShopProfile(),
    prisma.walletTransaction.findMany({
      where: { customerId: customer.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    }),
  ]);
  const usdRate = await getUsdRate(profile);

  const returned = returnedTxRef ? transactions.find((t) => t.txRef === returnedTxRef) : undefined;
  const watching = transactions.some(isAwaitingGateway);

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      {watching && <AutoRefresh intervalMs={5000} />}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">My Wallet</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Credit for unlock &amp; flash tools</p>
          </div>
        </div>
        <AccountLogoutButton />
      </div>

      <AccountNav />

      {returned && (
        <div
          className={`rounded-xl border p-3 text-xs font-semibold ${
            returned.status === 'COMPLETED'
              ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : returned.status === 'FAILED'
                ? 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400'
                : 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300'
          }`}
        >
          {returned.status === 'COMPLETED'
            ? `Top-up of ${formatUsdCents(returned.amountCents)} received. Thank you!`
            : returned.status === 'FAILED'
              ? 'That payment did not go through. No money was added; you can try again below.'
              : 'Confirming your payment… this page updates automatically.'}
        </div>
      )}

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <div className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Balance</div>
        <div className="mt-1 text-3xl font-black text-neutral-900 dark:text-white">
          {formatUsdCents(customer.walletBalanceCents)}
        </div>
        <div className="text-xs text-neutral-500">
          ≈ UGX {Math.round((customer.walletBalanceCents * usdRate.rate) / 100).toLocaleString()} at today&apos;s rate
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <h2 className="mb-4 text-sm font-black text-neutral-900 dark:text-white">Top up</h2>
        <WalletTopUpForm
          usdRate={usdRate.rate}
          hasPhone={Boolean(customer.phone)}
          availableMethods={availableTopUpMethods()}
        />
        <p className="mt-4 text-[11px] text-neutral-500">
          Wallet credit can be spent on unlock &amp; flash tools on this site. It can&apos;t be withdrawn as cash.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <h2 className="border-b border-neutral-200 dark:border-neutral-800 px-5 py-3 text-sm font-black text-neutral-900 dark:text-white">
          History
        </h2>
        {transactions.length === 0 ? (
          <p className="p-5 text-xs text-neutral-500">No wallet activity yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {transactions.map((t) => (
              <li key={t.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div>
                  <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    {TYPE_LABELS[t.type]}
                    {t.paymentMethod && (
                      <span className="font-normal text-neutral-500"> · {METHOD_LABELS[t.paymentMethod] ?? t.paymentMethod}</span>
                    )}
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    {formatDate(t.createdAt)}
                    {t.amountUgx !== null && <> · UGX {t.amountUgx.toLocaleString()}</>}
                    {(t.type === 'PURCHASE' || t.type === 'REFUND') && t.note && <> · {t.note}</>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-black ${t.amountCents >= 0 ? 'text-neutral-900 dark:text-white' : 'text-red-500'}`}
                  >
                    {t.amountCents >= 0 ? '+' : ''}
                    {formatUsdCents(t.amountCents)}
                  </span>
                  <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${STATUS_STYLES[t.status]}`}>
                    {t.status === 'PENDING' ? 'Pending' : t.status === 'COMPLETED' ? 'Done' : 'Failed'}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

import { Wallet } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/formatDate';
import { formatUsdCents } from '@/lib/walletAmounts';
import AutoRefresh from '@/components/AutoRefresh';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import WalletTopUpActions from '@/components/admin/WalletTopUpActions';

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

export default async function AdminWalletPage() {
  await requireAdminPage();

  const customerSelect = { select: { name: true, email: true, phone: true } } as const;
  const [awaitingApproval, recent, totals, topHolders] = await Promise.all([
    prisma.walletTransaction.findMany({
      where: { type: 'TOPUP', status: 'PENDING', paymentMethod: 'AIRTEL_MONEY' },
      orderBy: { createdAt: 'asc' },
      include: { customer: customerSelect },
    }),
    prisma.walletTransaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { customer: customerSelect },
    }),
    prisma.customer.aggregate({ _sum: { walletBalanceCents: true }, where: { walletBalanceCents: { gt: 0 } } }),
    prisma.customer.findMany({
      where: { walletBalanceCents: { gt: 0 } },
      orderBy: { walletBalanceCents: 'desc' },
      take: 10,
      select: { id: true, name: true, email: true, walletBalanceCents: true },
    }),
  ]);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={10000} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Wallet className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Customer Wallets</h1>
            <p className="text-xs text-neutral-500">
              Total held for customers: {formatUsdCents(totals._sum.walletBalanceCents ?? 0)}
            </p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <h2 className="border-b border-neutral-200 dark:border-neutral-800 px-5 py-3 text-sm font-black text-neutral-900 dark:text-white">
          Airtel Money top-ups awaiting approval ({awaitingApproval.length})
        </h2>
        {awaitingApproval.length === 0 ? (
          <p className="p-5 text-xs text-neutral-500">Nothing to approve.</p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {awaitingApproval.map((t) => (
              <li key={t.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="text-xs">
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {formatUsdCents(t.amountCents)} · pay UGX {t.amountUgx?.toLocaleString()}
                  </div>
                  <div className="text-neutral-500">
                    {t.customer.name ?? t.customer.email} · {t.customer.phone ?? t.customer.email}
                  </div>
                  <div className="mt-1">
                    Airtel transaction ID:{' '}
                    <span className="font-mono font-bold text-neutral-900 dark:text-white">{t.paymentReference}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500">{formatDate(t.createdAt)}</div>
                </div>
                <WalletTopUpActions topUpId={t.id} summary={formatUsdCents(t.amountCents)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <h2 className="border-b border-neutral-200 dark:border-neutral-800 px-5 py-3 text-sm font-black text-neutral-900 dark:text-white">
          Largest balances
        </h2>
        {topHolders.length === 0 ? (
          <p className="p-5 text-xs text-neutral-500">No customer has a balance yet.</p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {topHolders.map((c) => (
              <li key={c.id} className="flex items-center justify-between px-5 py-2.5 text-xs">
                <span className="text-neutral-700 dark:text-neutral-300">{c.name ?? c.email}</span>
                <span className="font-black text-neutral-900 dark:text-white">{formatUsdCents(c.walletBalanceCents)}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <h2 className="border-b border-neutral-200 dark:border-neutral-800 px-5 py-3 text-sm font-black text-neutral-900 dark:text-white">
          Recent wallet activity
        </h2>
        {recent.length === 0 ? (
          <p className="p-5 text-xs text-neutral-500">No wallet activity yet.</p>
        ) : (
          <table className="w-full text-left text-xs">
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {recent.map((t) => (
                <tr key={t.id}>
                  <td className="px-5 py-2.5 text-neutral-500 whitespace-nowrap">{formatDate(t.createdAt)}</td>
                  <td className="px-2 py-2.5 text-neutral-700 dark:text-neutral-300">{t.customer.name ?? t.customer.email}</td>
                  <td className="px-2 py-2.5 text-neutral-500">
                    {t.type.toLowerCase()}
                    {t.paymentMethod && ` · ${METHOD_LABELS[t.paymentMethod] ?? t.paymentMethod}`}
                  </td>
                  <td className="px-2 py-2.5 text-right font-bold text-neutral-900 dark:text-white whitespace-nowrap">
                    {formatUsdCents(t.amountCents)}
                    {t.amountUgx !== null && (
                      <span className="block text-[10px] font-normal text-neutral-500">UGX {t.amountUgx.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${STATUS_STYLES[t.status]}`}>
                      {t.status.toLowerCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

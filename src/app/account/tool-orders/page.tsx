import Link from 'next/link';
import { KeyRound } from 'lucide-react';
import { requireCustomerPage } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/formatDate';
import { describeToolOrder, type ToolOrderDetail } from '@/lib/toolOrders';
import { formatUsdCents } from '@/lib/walletAmounts';
import AccountLogoutButton from '@/components/account/AccountLogoutButton';
import AccountNav from '@/components/account/AccountNav';
import AutoRefresh from '@/components/AutoRefresh';

export const metadata = { title: 'My Tool Orders' };

const STATUS = {
  PAID: { label: 'Paid, loading soon', className: 'bg-amber-500/10 text-amber-500' },
  COMPLETED: { label: 'Done', className: 'bg-emerald-500/10 text-emerald-500' },
  REFUNDED: { label: 'Refunded to wallet', className: 'bg-neutral-500/10 text-neutral-500' },
} as const;

export default async function ToolOrdersPage() {
  const customer = await requireCustomerPage();
  const orders = await prisma.toolOrder.findMany({
    where: { customerId: customer.id },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });
  const waiting = orders.some((o) => o.status === 'PAID');

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      {waiting && <AutoRefresh intervalMs={15000} />}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Tool Orders</h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">Unlock &amp; flash tools paid from your wallet</p>
          </div>
        </div>
        <AccountLogoutButton />
      </div>

      <AccountNav />

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-8 text-center text-xs text-neutral-500">
          No tool orders yet.{' '}
          <Link href="/shop/unlock-tools" className="font-bold text-amber-500 hover:underline">
            Browse unlock &amp; flash tools
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => {
            const details = order.details as unknown as ToolOrderDetail[];
            return (
              <li
                key={order.id}
                className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">{describeToolOrder(order)}</div>
                    <div className="text-[11px] text-neutral-500">
                      {formatDate(order.createdAt)} · {formatUsdCents(order.totalCents)}
                    </div>
                  </div>
                  <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold ${STATUS[order.status].className}`}>
                    {STATUS[order.status].label}
                  </span>
                </div>
                {details.length > 0 && (
                  <dl className="mt-3 space-y-0.5 text-[11px]">
                    {details.map((d) => (
                      <div key={d.label} className="flex gap-2">
                        <dt className="text-neutral-500">{d.label}:</dt>
                        <dd className="font-mono text-neutral-800 dark:text-neutral-200">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {order.adminNote && (
                  <p className="mt-3 whitespace-pre-wrap rounded-lg bg-neutral-50 dark:bg-neutral-950 p-3 text-xs text-neutral-800 dark:text-neutral-200">
                    {order.adminNote}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}

import { KeyRound } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import { formatDate } from '@/lib/formatDate';
import { describeToolOrder, type ToolOrderDetail } from '@/lib/toolOrders';
import { formatUsdCents } from '@/lib/walletAmounts';
import AutoRefresh from '@/components/AutoRefresh';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import ToolOrderActions from '@/components/admin/ToolOrderActions';

const STATUS_STYLES = {
  PAID: 'bg-amber-500/10 text-amber-500',
  COMPLETED: 'bg-emerald-500/10 text-emerald-500',
  REFUNDED: 'bg-neutral-500/10 text-neutral-500',
} as const;

export default async function AdminToolOrdersPage() {
  await requireAdminPage();

  const customer = { select: { name: true, email: true, phone: true } } as const;
  const [waiting, recent] = await Promise.all([
    prisma.toolOrder.findMany({ where: { status: 'PAID' }, orderBy: { createdAt: 'asc' }, include: { customer } }),
    prisma.toolOrder.findMany({
      where: { status: { not: 'PAID' } },
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { customer },
    }),
  ]);

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={10000} />
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <KeyRound className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Tool Orders</h1>
            <p className="text-xs text-neutral-500">Paid from customer wallets — load them, then mark Done</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <section className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <h2 className="border-b border-neutral-200 dark:border-neutral-800 px-5 py-3 text-sm font-black text-neutral-900 dark:text-white">
          Waiting to be loaded ({waiting.length})
        </h2>
        {waiting.length === 0 ? (
          <p className="p-5 text-xs text-neutral-500">All caught up.</p>
        ) : (
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {waiting.map((order) => (
              <li key={order.id} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0 text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wide text-amber-500">{order.toolCategory}</div>
                  <div className="font-bold text-neutral-900 dark:text-white">
                    {describeToolOrder(order)} · {formatUsdCents(order.totalCents)}
                  </div>
                  <div className="text-neutral-500">
                    {order.customer.name ?? order.customer.email} · {order.customer.phone ?? order.customer.email} ·{' '}
                    {formatDate(order.createdAt)}
                  </div>
                  <dl className="mt-2 space-y-0.5">
                    {(order.details as unknown as ToolOrderDetail[]).map((d) => (
                      <div key={d.label} className="flex flex-wrap gap-x-2">
                        <dt className="text-neutral-500">{d.label}:</dt>
                        <dd className="select-all font-mono font-bold text-neutral-900 dark:text-white">{d.value}</dd>
                      </div>
                    ))}
                  </dl>
                  {order.notes && (
                    <p className="mt-2 rounded-lg bg-neutral-50 dark:bg-neutral-950 p-2 text-neutral-700 dark:text-neutral-300">
                      {order.notes}
                    </p>
                  )}
                </div>
                <ToolOrderActions orderId={order.id} total={formatUsdCents(order.totalCents)} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="overflow-x-auto rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <h2 className="border-b border-neutral-200 dark:border-neutral-800 px-5 py-3 text-sm font-black text-neutral-900 dark:text-white">
          Recent
        </h2>
        {recent.length === 0 ? (
          <p className="p-5 text-xs text-neutral-500">No completed or refunded orders yet.</p>
        ) : (
          <table className="w-full text-left text-xs">
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {recent.map((order) => (
                <tr key={order.id}>
                  <td className="px-5 py-2.5 whitespace-nowrap text-neutral-500">{formatDate(order.createdAt)}</td>
                  <td className="px-2 py-2.5 text-neutral-700 dark:text-neutral-300">{order.customer.name ?? order.customer.email}</td>
                  <td className="px-2 py-2.5 text-neutral-900 dark:text-white">{describeToolOrder(order)}</td>
                  <td className="px-2 py-2.5 text-right font-bold whitespace-nowrap text-neutral-900 dark:text-white">
                    {formatUsdCents(order.totalCents)}
                  </td>
                  <td className="px-5 py-2.5 text-right">
                    <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${STATUS_STYLES[order.status]}`}>
                      {order.status.toLowerCase()}
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

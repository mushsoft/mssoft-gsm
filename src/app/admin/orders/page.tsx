import Link from 'next/link';
import type { Prisma } from '@prisma/client';
import { ClipboardList, Pencil } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';
import { PaymentStatusBadge, FulfillmentStatusBadge } from '@/components/admin/OrderStatusBadge';

const ORDER_TABS: { key: string; label: string; where: Prisma.OrderWhereInput }[] = [
  { key: 'all', label: 'All', where: {} },
  { key: 'pending', label: 'Pending', where: { paymentStatus: 'PENDING' } },
  { key: 'successful', label: 'Successful', where: { paymentStatus: 'SUCCESSFUL' } },
  { key: 'failed', label: 'Failed', where: { paymentStatus: 'FAILED' } },
  { key: 'refunded', label: 'Refunded', where: { paymentStatus: 'REFUNDED' } },
];

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string; customerId?: string }>;
}) {
  await requireAdminPage();

  const { tab, customerId } = await searchParams;
  const activeTab = ORDER_TABS.find((t) => t.key === tab) ?? ORDER_TABS[0];
  const customerFilter: Prisma.OrderWhereInput = customerId ? { customerId } : {};
  const combinedWhere: Prisma.OrderWhereInput = { ...activeTab.where, ...customerFilter };

  // Sequential, not Promise.all — concurrent Prisma queries over the shared
  // pooled connection have triggered a Postgres protocol error ("bind
  // message supplies N parameters, but prepared statement requires 0") in
  // this environment (see ReviewsSection.tsx, adminDashboard.ts).
  const orders = await prisma.order.findMany({
    where: combinedWhere,
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
  const counts: number[] = [];
  for (const t of ORDER_TABS) {
    counts.push(await prisma.order.count({ where: { ...t.where, ...customerFilter } }));
  }
  const filteredCustomer = customerId
    ? await prisma.customer.findUnique({ where: { id: customerId }, select: { name: true, email: true } })
    : null;

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <ClipboardList className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Orders</h1>
            <p className="text-xs text-neutral-500">{counts[0]} orders</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      {customerId && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2 text-xs">
          <span className="text-neutral-600 dark:text-neutral-300">
            Filtered to orders from <span className="font-bold">{filteredCustomer?.name ?? filteredCustomer?.email ?? 'this customer'}</span>
          </span>
          <Link href={tab ? `/admin/orders?tab=${tab}` : '/admin/orders'} className="font-bold text-amber-500 hover:underline">
            Clear
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
        {ORDER_TABS.map((t, i) => {
          const active = t.key === activeTab.key;
          const params = new URLSearchParams();
          if (t.key !== 'all') params.set('tab', t.key);
          if (customerId) params.set('customerId', customerId);
          const href = params.toString() ? `/admin/orders?${params.toString()}` : '/admin/orders';
          return (
            <Link
              key={t.key}
              href={href}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                active
                  ? 'bg-amber-500 text-black'
                  : 'border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/40 hover:text-amber-500'
              }`}
            >
              {t.label}
              <span className={active ? 'text-black/60' : 'text-neutral-400 dark:text-neutral-600'}>{counts[i]}</span>
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Customer</th>
              <th className="px-4 py-3 font-bold">Items</th>
              <th className="px-4 py-3 font-bold">Total</th>
              <th className="px-4 py-3 font-bold">Payment</th>
              <th className="px-4 py-3 font-bold">Fulfillment</th>
              <th className="px-4 py-3 font-bold">Date</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {orders.map((order) => (
              <tr key={order.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                <td className="px-4 py-3 align-top">
                  <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">{order.customerName}</div>
                  <div className="text-[10px] text-neutral-500">{order.customerPhone}</div>
                </td>
                <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                  {order.items.length} item{order.items.length === 1 ? '' : 's'}
                </td>
                <td className="px-4 py-3 align-middle text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  UGX {order.totalAmount.toLocaleString()}
                </td>
                <td className="px-4 py-3 align-middle">
                  <PaymentStatusBadge status={order.paymentStatus} />
                </td>
                <td className="px-4 py-3 align-middle">
                  <FulfillmentStatusBadge status={order.fulfillmentStatus} />
                </td>
                <td className="px-4 py-3 align-middle text-[10px] text-neutral-500">
                  {order.createdAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-3 align-middle">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="flex w-fit items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500">No orders in {activeTab.label.toLowerCase()} yet.</div>
        )}
      </div>
    </main>
  );
}

import Link from 'next/link';
import { Users, ArrowRight } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AdminNav from '@/components/admin/AdminNav';
import LogoutButton from '@/components/admin/LogoutButton';

export default async function AdminCustomersPage() {
  await requireAdminPage();

  const customers = await prisma.customer.findMany({
    include: { orders: { select: { totalAmount: true, paymentStatus: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">Customers</h1>
            <p className="text-xs text-neutral-500">{customers.length} accounts</p>
          </div>
        </div>
        <LogoutButton />
      </div>

      <AdminNav />

      <div className="overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-white text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-900">
            <tr>
              <th className="px-4 py-3 font-bold">Customer</th>
              <th className="px-4 py-3 font-bold">Orders</th>
              <th className="px-4 py-3 font-bold">Total Spent</th>
              <th className="px-4 py-3 font-bold">Joined</th>
              <th className="px-4 py-3 font-bold"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {customers.map((customer) => {
              const paidOrders = customer.orders.filter((o) => o.paymentStatus === 'SUCCESSFUL');
              const totalSpent = paidOrders.reduce((sum, o) => sum + o.totalAmount, 0);
              return (
                <tr key={customer.id} className="bg-neutral-50/40 dark:bg-neutral-950/40">
                  <td className="px-4 py-3 align-top">
                    <div className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                      {customer.name || 'Unnamed'}
                      {customer.username && <span className="ml-1 font-normal text-neutral-400">@{customer.username}</span>}
                    </div>
                    <div className="text-[10px] text-neutral-500">{customer.email}</div>
                    {customer.phone && <div className="text-[10px] text-neutral-500">{customer.phone}</div>}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs text-neutral-600 dark:text-neutral-300">
                    {customer.orders.length}
                  </td>
                  <td className="px-4 py-3 align-middle text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    UGX {totalSpent.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 align-middle text-[10px] text-neutral-500">
                    {customer.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 align-middle">
                    <Link
                      href={`/admin/orders?customerId=${customer.id}`}
                      className="flex w-fit items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500"
                    >
                      Orders
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {customers.length === 0 && (
          <div className="p-8 text-center text-xs text-neutral-500">No customer accounts yet.</div>
        )}
      </div>
    </main>
  );
}

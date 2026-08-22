import Link from 'next/link';
import { ClipboardList, Package } from 'lucide-react';
import { requireCustomerPage } from '@/lib/customerAuth';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import AccountNav from '@/components/account/AccountNav';
import { PaymentStatusBadge, FulfillmentStatusBadge } from '@/components/admin/OrderStatusBadge';

export default async function AccountOrdersPage() {
  const customer = await requireCustomerPage();

  const orders = await prisma.order.findMany({
    where: { customerId: customer.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={20000} />
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <ClipboardList className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-black text-neutral-900 dark:text-white">My Orders</h1>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{orders.length} orders</p>
        </div>
      </div>

      <AccountNav />

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-8 text-center text-xs text-neutral-500">
          No orders yet,{' '}
          <Link href="/shop" className="font-bold text-amber-500 hover:underline">
            start shopping
          </Link>
          .
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4">
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <PaymentStatusBadge status={order.paymentStatus} />
                  <FulfillmentStatusBadge status={order.fulfillmentStatus} />
                </div>
                <span className="text-[10px] text-neutral-500">{order.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="space-y-1">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-300">
                    <Package className="h-3.5 w-3.5 shrink-0 text-neutral-400" />
                    <span className="truncate">{item.product?.title ?? 'Product removed'}</span>
                    <span className="ml-auto shrink-0 text-neutral-400">&times;{item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2">
                <span className="text-[10px] font-bold uppercase tracking-wide text-neutral-500">Total</span>
                <span className="text-sm font-black text-neutral-900 dark:text-white">UGX {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

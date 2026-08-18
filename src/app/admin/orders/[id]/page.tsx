import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ClipboardList, MessageCircle, Package } from 'lucide-react';
import { requireAdminPage } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';
import AutoRefresh from '@/components/AutoRefresh';
import OrderActions from '@/components/admin/OrderActions';
import { PaymentStatusBadge, FulfillmentStatusBadge } from '@/components/admin/OrderStatusBadge';

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { product: true } } },
  });

  if (!order) {
    notFound();
  }

  const whatsappDigits = order.customerPhone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${whatsappDigits}`;

  return (
    <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
      <AutoRefresh intervalMs={15000} />
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 dark:text-neutral-400 transition-colors hover:text-amber-500"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Orders</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
          <ClipboardList className="h-5 w-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-black text-neutral-900 dark:text-white">{order.customerName}</h1>
            <PaymentStatusBadge status={order.paymentStatus} />
            <FulfillmentStatusBadge status={order.fulfillmentStatus} />
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Ordered {order.createdAt.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Customer</h2>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Name</dt>
              <dd className="font-bold text-neutral-800 dark:text-neutral-200">{order.customerName}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Phone</dt>
              <dd className="font-bold text-neutral-800 dark:text-neutral-200">{order.customerPhone}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Email</dt>
              <dd className="font-bold text-neutral-800 dark:text-neutral-200">{order.customerEmail}</dd>
            </div>
          </dl>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-fit items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
          >
            <MessageCircle className="h-3.5 w-3.5 fill-current" />
            Message on WhatsApp
          </a>
        </div>

        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Payment</h2>
          <dl className="space-y-2 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Method</dt>
              <dd className="font-bold text-neutral-800 dark:text-neutral-200">{order.paymentMethod}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Transaction Ref</dt>
              <dd className="max-w-[60%] truncate font-mono text-[10px] font-bold text-neutral-800 dark:text-neutral-200" title={order.txRef}>
                {order.txRef}
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-neutral-500">Total</dt>
              <dd className="font-bold text-neutral-800 dark:text-neutral-200">UGX {order.totalAmount.toLocaleString()}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Items</h2>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 py-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <Package className="h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-600" />
                <div className="min-w-0">
                  <Link
                    href={`/admin/products/${item.productId}`}
                    className="block truncate text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:text-amber-500"
                  >
                    {item.product?.title ?? 'Product removed'}
                  </Link>
                  <div className="text-[10px] text-neutral-500">
                    {item.quantity} &times; UGX {item.price.toLocaleString()}
                  </div>
                </div>
              </div>
              <div className="shrink-0 text-xs font-bold text-neutral-800 dark:text-neutral-200">
                UGX {(item.quantity * item.price).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-3">
          <span className="text-xs font-bold uppercase tracking-wide text-neutral-500">Total</span>
          <span className="text-sm font-black text-neutral-900 dark:text-white">UGX {order.totalAmount.toLocaleString()}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-5">
        <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-neutral-500">Manage</h2>
        <OrderActions orderId={order.id} paymentStatus={order.paymentStatus} fulfillmentStatus={order.fulfillmentStatus} />
      </div>
    </main>
  );
}

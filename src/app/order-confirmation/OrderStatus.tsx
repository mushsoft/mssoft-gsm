'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Loader2,
  MessageCircle,
  PackageX,
  XCircle,
} from 'lucide-react';

type OrderSummary = {
  txRef: string;
  status: 'PENDING' | 'SUCCESSFUL' | 'FAILED';
  totalAmount: number;
  customerName: string;
  createdAt: string;
  items: { title: string; quantity: number; price: number }[];
};

const POLL_INTERVAL_MS = 3000;
const MAX_POLLS = 20;
const WHATSAPP_PHONE = '256773944288';

export default function OrderStatus() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get('tx_ref');

  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [pollCount, setPollCount] = useState(0);

  useEffect(() => {
    if (!txRef) return;

    let cancelled = false;

    async function poll() {
      try {
        const response = await fetch(`/api/checkout/status?tx_ref=${encodeURIComponent(txRef!)}`);
        const data = await response.json();

        if (cancelled) return;

        if (!response.ok || !data.success) {
          setFetchError(data.error || 'Order not found');
          return;
        }

        setOrder(data.order);
        setFetchError(null);
      } catch {
        if (!cancelled) setFetchError('Unable to reach the server');
      }
    }

    poll();
    const interval = setInterval(() => {
      setPollCount((count) => count + 1);
      poll();
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [txRef]);

  if (!txRef) {
    return (
      <StatusShell
        icon={<PackageX className="h-8 w-8" />}
        iconClass="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
        title="No order reference found"
        message="This page is meant to be reached after a checkout redirect. If you were sent here from a payment link, please try again."
      />
    );
  }

  if (fetchError) {
    return (
      <StatusShell
        icon={<XCircle className="h-8 w-8" />}
        iconClass="bg-red-500/10 text-red-400"
        title="We couldn't find that order"
        message={fetchError}
      />
    );
  }

  if (!order) {
    return (
      <StatusShell
        icon={<Loader2 className="h-8 w-8 animate-spin" />}
        iconClass="bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400"
        title="Loading your order..."
        message="Hang tight while we look that up."
      />
    );
  }

  if (order.status === 'SUCCESSFUL') {
    return (
      <StatusShell
        icon={<CheckCircle2 className="h-8 w-8" />}
        iconClass="bg-emerald-500/10 text-emerald-400"
        title="Payment confirmed!"
        message={`Thanks, ${order.customerName}. Your order is confirmed and we're preparing it for dispatch.`}
      >
        <OrderSummaryCard order={order} />
      </StatusShell>
    );
  }

  if (order.status === 'FAILED') {
    return (
      <StatusShell
        icon={<XCircle className="h-8 w-8" />}
        iconClass="bg-red-500/10 text-red-400"
        title="Payment did not go through"
        message="Your payment could not be confirmed. No charge should have been made — you can try again or reach out for help."
      >
        <OrderSummaryCard order={order} />
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
            `Hi, my payment for order ${order.txRef} failed. Can you help?`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
          Get Help via WhatsApp
        </a>
      </StatusShell>
    );
  }

  // PENDING — still waiting on the Flutterwave webhook to confirm.
  const stillPolling = pollCount < MAX_POLLS;

  return (
    <StatusShell
      icon={<Loader2 className="h-8 w-8 animate-spin" />}
      iconClass="bg-amber-500/10 text-amber-400"
      title="Confirming your payment..."
      message={
        stillPolling
          ? 'This usually takes a few seconds. This page will update automatically.'
          : "This is taking longer than expected. Your payment may still be processing — we'll confirm via WhatsApp once it clears."
      }
    >
      <OrderSummaryCard order={order} />
      {!stillPolling && (
        <a
          href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
            `Hi, I'd like to check on the status of order ${order.txRef}.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
          Check via WhatsApp
        </a>
      )}
    </StatusShell>
  );
}

function OrderSummaryCard({ order }: { order: OrderSummary }) {
  return (
    <div className="mt-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-4 text-left">
      <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-neutral-500">
        <span>Order Ref</span>
        <span className="font-mono text-neutral-500 dark:text-neutral-400">{order.txRef}</span>
      </div>
      <div className="space-y-1.5">
        {order.items.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs text-neutral-600 dark:text-neutral-300">
            <span className="truncate pr-2">
              {item.title} {item.quantity > 1 ? `x${item.quantity}` : ''}
            </span>
            <span className="shrink-0 font-mono">UGX {(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 text-sm font-bold">
        <span className="text-neutral-500 dark:text-neutral-400">Total</span>
        <span className="text-amber-400">UGX {order.totalAmount.toLocaleString()}</span>
      </div>
    </div>
  );
}

function StatusShell({
  icon,
  iconClass,
  title,
  message,
  children,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  message: string;
  children?: React.ReactNode;
}) {
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <div className={`flex h-16 w-16 items-center justify-center rounded-full ${iconClass}`}>{icon}</div>
      <h1 className="mt-4 text-lg font-black text-neutral-900 dark:text-white">{title}</h1>
      <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">{message}</p>
      {children}
      <Link
        href="/"
        className="mt-6 text-xs font-semibold text-neutral-500 transition-colors hover:text-amber-500"
      >
        Back to Home
      </Link>
    </main>
  );
}

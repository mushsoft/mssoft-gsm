'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, RotateCcw, XCircle } from 'lucide-react';

const FULFILLMENT_OPTIONS = [
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'READY', label: 'Ready for Pickup/Delivery' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
];

export default function OrderActions({
  orderId,
  paymentStatus,
  fulfillmentStatus,
}: {
  orderId: string;
  paymentStatus: string;
  fulfillmentStatus: string;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirming, setConfirming] = useState<'paid' | 'failed' | 'refund' | null>(null);
  const [fulfillment, setFulfillment] = useState(fulfillmentStatus);
  const [error, setError] = useState<string | null>(null);

  async function runAction(url: string) {
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(url, { method: 'POST' });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        setConfirming(null);
        return;
      }
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
      setConfirming(null);
    }
  }

  async function updateFulfillment(next: string) {
    const previous = fulfillment;
    setFulfillment(next);
    setError(null);
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fulfillmentStatus: next }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Unable to update fulfillment status');
        setFulfillment(previous);
        return;
      }
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setFulfillment(previous);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 outline-none focus:border-amber-500/50 disabled:opacity-60';

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
          Fulfillment Status
        </label>
        <select
          value={fulfillment}
          onChange={(e) => updateFulfillment(e.target.value)}
          disabled={isSubmitting}
          className={inputClass}
        >
          {FULFILLMENT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {paymentStatus === 'PENDING' && (
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
            Payment
          </label>

          {confirming === 'paid' ? (
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40 p-3">
              <p className="mb-2 text-xs text-emerald-700 dark:text-emerald-300">
                Confirm this order was paid outside the site (e.g. cash/in-person)? This will decrement stock for
                its items and cannot be undone here.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => runAction(`/api/admin/orders/${orderId}/mark-paid`)}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500 disabled:opacity-60"
                >
                  {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
                  Confirm Paid
                </button>
                <button
                  onClick={() => setConfirming(null)}
                  disabled={isSubmitting}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : confirming === 'failed' ? (
            <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 p-3">
              <p className="mb-2 text-xs text-red-600 dark:text-red-300">
                Mark this order as failed/cancelled? No stock will be changed.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => runAction(`/api/admin/orders/${orderId}/mark-failed`)}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-500 disabled:opacity-60"
                >
                  {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <XCircle className="h-3.5 w-3.5" />}
                  Confirm Failed
                </button>
                <button
                  onClick={() => setConfirming(null)}
                  disabled={isSubmitting}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirming('paid')}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500 disabled:opacity-60"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Mark as Paid
              </button>
              <button
                onClick={() => setConfirming('failed')}
                disabled={isSubmitting}
                className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-red-500/40 hover:text-red-500 disabled:opacity-60"
              >
                <XCircle className="h-3.5 w-3.5" />
                Mark as Failed
              </button>
            </div>
          )}
        </div>
      )}

      {paymentStatus === 'SUCCESSFUL' && (
        <div>
          <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">
            Payment
          </label>

          {confirming === 'refund' ? (
            <div className="rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 p-3">
              <p className="mb-2 text-xs text-amber-700 dark:text-amber-300">
                Mark this order as refunded? This will restock its items and cannot be undone here.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => runAction(`/api/admin/orders/${orderId}/mark-refunded`)}
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-amber-500 disabled:opacity-60"
                >
                  {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RotateCcw className="h-3.5 w-3.5" />}
                  Confirm Refund
                </button>
                <button
                  onClick={() => setConfirming(null)}
                  disabled={isSubmitting}
                  className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-60"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setConfirming('refund')}
              disabled={isSubmitting}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500 disabled:opacity-60"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Mark as Refunded
            </button>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}
    </div>
  );
}

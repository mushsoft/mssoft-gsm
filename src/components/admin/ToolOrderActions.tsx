'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, RotateCcw } from 'lucide-react';

// Done / Refund for a paid tool order, with a note the customer sees (e.g.
// an activation code, or why it was refunded) and a confirm step — a refund
// returns real money to the wallet and can't be undone here.
export default function ToolOrderActions({ orderId, total }: { orderId: string; total: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState<'complete' | 'refund' | null>(null);
  const [adminNote, setAdminNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: 'complete' | 'refund') {
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/tool-orders/${orderId}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminNote }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  if (!confirming) {
    return (
      <div className="flex gap-2">
        <button
          onClick={() => setConfirming('complete')}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Mark Done
        </button>
        <button
          onClick={() => setConfirming('refund')}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-amber-500/40 hover:text-amber-500"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Refund
        </button>
      </div>
    );
  }

  const isComplete = confirming === 'complete';
  return (
    <div
      className={`w-full max-w-sm space-y-2 rounded-lg border p-3 ${
        isComplete
          ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40'
          : 'border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40'
      }`}
    >
      <p className="text-xs text-neutral-700 dark:text-neutral-300">
        {isComplete
          ? 'Loaded on the supplier panel? The customer gets an email with your note.'
          : `Refund ${total} to the customer's wallet? This can't be undone here.`}
      </p>
      <textarea
        rows={2}
        maxLength={1000}
        value={adminNote}
        onChange={(e) => setAdminNote(e.target.value)}
        placeholder={isComplete ? 'Note for the customer (optional), e.g. activation code' : 'Reason (optional, shown to customer)'}
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-2.5 py-1.5 text-xs text-neutral-900 dark:text-neutral-200 outline-none focus:border-amber-500/50"
      />
      <div className="flex gap-2">
        <button
          onClick={() => run(confirming)}
          disabled={isSubmitting}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-colors disabled:opacity-60 ${
            isComplete ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-amber-600 hover:bg-amber-500'
          }`}
        >
          {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {isComplete ? 'Confirm Done' : 'Confirm Refund'}
        </button>
        <button
          onClick={() => setConfirming(null)}
          disabled={isSubmitting}
          className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-60"
        >
          Cancel
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

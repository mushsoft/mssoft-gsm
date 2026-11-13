'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, XCircle } from 'lucide-react';

// Approve / Reject for a pending Airtel Money wallet top-up, with a confirm
// step like OrderActions — approving credits real balance and can't be
// undone here.
export default function WalletTopUpActions({ topUpId, summary }: { topUpId: string; summary: string }) {
  const router = useRouter();
  const [confirming, setConfirming] = useState<'approve' | 'reject' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(action: 'approve' | 'reject') {
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/wallet/${topUpId}/${action}`, { method: 'POST' });
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

  const secondary =
    'rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-60';

  return (
    <div className="space-y-2">
      {confirming ? (
        <div
          className={`rounded-lg border p-3 ${
            confirming === 'approve'
              ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/40'
              : 'border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40'
          }`}
        >
          <p className="mb-2 text-xs text-neutral-700 dark:text-neutral-300">
            {confirming === 'approve'
              ? `Confirm you received this Airtel Money payment? This adds ${summary} to the customer's wallet and can't be undone here.`
              : 'Reject this top-up? No balance is changed.'}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => run(confirming)}
              disabled={isSubmitting}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold text-white transition-colors disabled:opacity-60 ${
                confirming === 'approve' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-red-600 hover:bg-red-500'
              }`}
            >
              {isSubmitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {confirming === 'approve' ? 'Confirm Approve' : 'Confirm Reject'}
            </button>
            <button onClick={() => setConfirming(null)} disabled={isSubmitting} className={secondary}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setConfirming('approve')}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-emerald-500"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Approve
          </button>
          <button
            onClick={() => setConfirming('reject')}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-red-500/40 hover:text-red-500"
          >
            <XCircle className="h-3.5 w-3.5" />
            Reject
          </button>
        </div>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

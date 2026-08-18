'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, Lock, Send } from 'lucide-react';

export default function RepairRequestReplyForm({
  requestId,
  existingReply,
  status,
}: {
  requestId: string;
  existingReply: string | null;
  status: string;
}) {
  const router = useRouter();
  const [reply, setReply] = useState(existingReply ?? '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(body: object) {
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/repair-requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsSubmitting(false);
        return;
      }
      router.refresh();
      setIsSubmitting(false);
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  if (status === 'CLOSED') {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-xs font-bold text-neutral-500">
        <Lock className="h-3.5 w-3.5" />
        This request is closed.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <textarea
        rows={4}
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Type your reply to the customer..."
        disabled={isSubmitting}
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 outline-none focus:border-amber-500/50 disabled:opacity-60"
      />

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => submit({ reply })}
          disabled={isSubmitting || !reply.trim()}
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          {status === 'ANSWERED' ? 'Update Reply' : 'Send Reply'}
        </button>
        {status === 'ANSWERED' && (
          <button
            onClick={() => submit({ status: 'CLOSED' })}
            disabled={isSubmitting}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3.5 py-2 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-500 disabled:opacity-60"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Close Request
          </button>
        )}
      </div>
    </div>
  );
}

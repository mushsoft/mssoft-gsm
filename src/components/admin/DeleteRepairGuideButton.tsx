'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';

export default function DeleteRepairGuideButton({ guideId, guideTitle }: { guideId: string; guideTitle: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    setError(null);
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/admin/repair-guides/${guideId}`, { method: 'DELETE' });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Unable to delete guide');
        setIsDeleting(false);
        setConfirming(false);
        return;
      }

      router.push('/admin/repair-guides');
      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setIsDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 p-3">
        <p className="mb-2 text-xs text-red-600 dark:text-red-300">
          Delete &quot;{guideTitle}&quot;? This can&apos;t be undone.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-red-500 disabled:opacity-60"
          >
            {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
            Confirm Delete
          </button>
          <button
            onClick={() => setConfirming(false)}
            disabled={isDeleting}
            className="rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
        {error && <p className="mt-2 text-[10px] text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-xs font-bold text-neutral-500 dark:text-neutral-400 transition-colors hover:border-red-500/40 hover:text-red-500"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Delete Guide
    </button>
  );
}

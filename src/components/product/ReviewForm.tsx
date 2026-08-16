'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Star } from 'lucide-react';

export default function ReviewForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (rating < 1) {
      setError('Please select a star rating');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, rating, title: title || null, body }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(data.error || 'Unable to submit review');
        setIsSubmitting(false);
        return;
      }

      router.refresh();
    } catch {
      setError('Network error. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-neutral-200 dark:border-neutral-800 p-3">
      <div>
        <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-neutral-500">Your Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              onMouseEnter={() => setHoverRating(n)}
              onMouseLeave={() => setHoverRating(0)}
              disabled={isSubmitting}
              aria-label={`${n} star${n === 1 ? '' : 's'}`}
            >
              <Star
                className={`h-5 w-5 ${
                  n <= (hoverRating || rating) ? 'fill-amber-500 text-amber-500' : 'text-neutral-300 dark:text-neutral-700'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (optional)"
        disabled={isSubmitting}
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        rows={3}
        placeholder="Share your experience with this product..."
        disabled={isSubmitting}
        className="w-full rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-3 py-2 text-sm text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-600 outline-none focus:border-amber-500/50 disabled:opacity-60"
      />

      {error && (
        <div className="rounded-lg border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 px-3 py-2 text-xs text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Submit Review'}
      </button>
    </form>
  );
}

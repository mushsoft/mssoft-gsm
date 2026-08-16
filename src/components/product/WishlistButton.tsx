'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Loader2 } from 'lucide-react';

export default function WishlistButton({
  productId,
  initialWishlisted,
  isLoggedIn,
}: {
  productId: string;
  initialWishlisted: boolean;
  isLoggedIn: boolean;
}) {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(initialWishlisted);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function toggle() {
    if (!isLoggedIn) {
      router.push('/account/login');
      return;
    }

    setIsSubmitting(true);
    const next = !wishlisted;
    try {
      const response = await fetch(next ? '/api/wishlist' : `/api/wishlist/${productId}`, {
        method: next ? 'POST' : 'DELETE',
        headers: next ? { 'Content-Type': 'application/json' } : undefined,
        body: next ? JSON.stringify({ productId }) : undefined,
      });
      if (response.ok) {
        setWishlisted(next);
        router.refresh();
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={isSubmitting}
      aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      className={`flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-bold transition-colors disabled:opacity-60 ${
        wishlisted
          ? 'border-red-500/40 bg-red-500/10 text-red-500'
          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300 hover:border-red-500/40 hover:text-red-500'
      }`}
    >
      {isSubmitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Heart className={`h-3.5 w-3.5 ${wishlisted ? 'fill-current' : ''}`} />}
      {wishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
    </button>
  );
}

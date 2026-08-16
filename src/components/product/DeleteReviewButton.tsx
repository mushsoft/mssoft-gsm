'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Trash2 } from 'lucide-react';

export default function DeleteReviewButton({ reviewId }: { reviewId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const response = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
    if (response.ok) {
      router.refresh();
    } else {
      setIsDeleting(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="flex items-center gap-1 text-[10px] font-bold text-neutral-400 transition-colors hover:text-red-500 disabled:opacity-60"
    >
      {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
      Delete
    </button>
  );
}

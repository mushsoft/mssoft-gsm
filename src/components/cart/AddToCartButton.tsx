'use client';

import { useEffect, useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

// Sits alongside (never replaces) BuyNowButton and the WhatsApp Order Now
// link — this is the path for accumulating multiple products before one
// checkout, not a substitute for either existing single-item flow.
export default function AddToCartButton({
  productId,
  inStock,
  compact = false,
}: {
  productId: string;
  inStock: boolean;
  /** Tighter padding/text for the narrow catalog-card button row. */
  compact?: boolean;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [justAdded]);

  if (!inStock) return null;

  return (
    <button
      type="button"
      onClick={() => {
        addItem(productId, 1);
        setJustAdded(true);
      }}
      className={`flex w-full items-center justify-center gap-1.5 rounded-lg border font-bold transition-colors ${
        compact ? 'px-2 py-1.5 text-[11px]' : 'px-3 py-2 text-xs'
      } ${
        justAdded
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500'
          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 text-neutral-600 dark:text-neutral-300 hover:border-amber-500/40 hover:text-amber-500'
      }`}
    >
      {justAdded ? <Check className="h-3.5 w-3.5" /> : <ShoppingCart className="h-3.5 w-3.5" />}
      {justAdded ? 'Added' : 'Add to Cart'}
    </button>
  );
}

'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { totalQuantity } from '@/lib/cart';

export default function CartIcon() {
  const { lines, isHydrated } = useCart();
  const count = totalQuantity(lines);

  return (
    <Link
      href="/cart"
      aria-label="View cart"
      className="relative flex items-center justify-center p-2 text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg transition-colors"
    >
      <ShoppingCart className="w-4 h-4" />
      {/* Only shown once the client has actually read localStorage — server
          render and first paint both have no count, so there's nothing here
          for hydration to mismatch against. */}
      {isHydrated && count > 0 && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-black">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  );
}

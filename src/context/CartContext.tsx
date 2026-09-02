'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { readCart, writeCart, mergeAdd, setLineQuantity, removeLine, type CartLine } from '@/lib/cart';

interface CartContextValue {
  lines: CartLine[];
  // False until the client has read localStorage once. The header badge and
  // the /cart page both gate their rendering on this — server render and
  // first client paint both produce lines=[]/isHydrated=false, so hydration
  // sees identical markup either way, then the real cart appears a frame
  // later once read client-side.
  isHydrated: boolean;
  addItem: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Deferred via queueMicrotask rather than calling setState directly in
    // the effect body — matches this codebase's existing convention (see
    // OrderStatus.tsx's poll()) for avoiding react-hooks/set-state-in-effect.
    queueMicrotask(() => {
      setLines(readCart());
      setIsHydrated(true);
    });
  }, []);

  useEffect(() => {
    // Don't write back before the initial read above has happened — that
    // would overwrite a real stored cart with the empty starting state.
    if (isHydrated) writeCart(lines);
  }, [lines, isHydrated]);

  // useCallback keeps these identities stable across renders (they only
  // ever use the functional setState form, no closure over `lines`), so
  // consumers can safely list them in their own effect dependency arrays
  // without triggering extra reruns.
  const addItem = useCallback((productId: string, quantity = 1) => {
    setLines((prev) => mergeAdd(prev, productId, quantity));
  }, []);
  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) => setLineQuantity(prev, productId, quantity));
  }, []);
  const removeItem = useCallback((productId: string) => {
    setLines((prev) => removeLine(prev, productId));
  }, []);
  const clear = useCallback(() => setLines([]), []);

  const value: CartContextValue = { lines, isHydrated, addItem, setQuantity, removeItem, clear };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

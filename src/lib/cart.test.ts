import { describe, it, expect, beforeEach } from 'vitest';
import { readCart, writeCart, mergeAdd, setLineQuantity, removeLine, totalQuantity, CART_STORAGE_KEY } from './cart';

// The vitest config here runs in a plain "node" environment (no jsdom), and
// this project's Node version doesn't expose a global localStorage — so a
// minimal in-memory shim stands in for it, just enough for cart.ts's own
// getItem/setItem calls.
class MemoryStorage {
  private store = new Map<string, string>();
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value);
  }
  clear(): void {
    this.store.clear();
  }
}

(globalThis as unknown as { localStorage: MemoryStorage }).localStorage = new MemoryStorage();

describe('cart storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reads an empty array when nothing is stored', () => {
    expect(readCart()).toEqual([]);
  });

  it('round-trips lines through write/read', () => {
    writeCart([{ productId: 'a', quantity: 2 }]);
    expect(readCart()).toEqual([{ productId: 'a', quantity: 2 }]);
  });

  it('drops malformed entries instead of throwing', () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ productId: 'a', quantity: 1 }, { quantity: 5 }, 'garbage', { productId: 'b', quantity: 0 }]));
    expect(readCart()).toEqual([{ productId: 'a', quantity: 1 }]);
  });

  it('recovers from corrupted (non-JSON) storage', () => {
    localStorage.setItem(CART_STORAGE_KEY, 'not json');
    expect(readCart()).toEqual([]);
  });
});

describe('mergeAdd', () => {
  it('creates a new line for a product not already in the cart', () => {
    expect(mergeAdd([], 'a', 1)).toEqual([{ productId: 'a', quantity: 1 }]);
  });

  it('increments an existing line rather than duplicating it', () => {
    const lines = mergeAdd([{ productId: 'a', quantity: 1 }], 'a', 2);
    expect(lines).toEqual([{ productId: 'a', quantity: 3 }]);
  });
});

describe('setLineQuantity', () => {
  it('updates the quantity of an existing line', () => {
    const lines = setLineQuantity([{ productId: 'a', quantity: 1 }], 'a', 5);
    expect(lines).toEqual([{ productId: 'a', quantity: 5 }]);
  });

  it('removes the line when quantity is set to 0', () => {
    const lines = setLineQuantity([{ productId: 'a', quantity: 1 }, { productId: 'b', quantity: 2 }], 'a', 0);
    expect(lines).toEqual([{ productId: 'b', quantity: 2 }]);
  });

  it('removes the line when quantity is negative', () => {
    const lines = setLineQuantity([{ productId: 'a', quantity: 1 }], 'a', -1);
    expect(lines).toEqual([]);
  });
});

describe('removeLine', () => {
  it('removes only the matching product', () => {
    const lines = removeLine([{ productId: 'a', quantity: 1 }, { productId: 'b', quantity: 2 }], 'a');
    expect(lines).toEqual([{ productId: 'b', quantity: 2 }]);
  });
});

describe('totalQuantity', () => {
  it('sums quantities across lines', () => {
    expect(totalQuantity([{ productId: 'a', quantity: 2 }, { productId: 'b', quantity: 3 }])).toBe(5);
  });

  it('is 0 for an empty cart', () => {
    expect(totalQuantity([])).toBe(0);
  });
});

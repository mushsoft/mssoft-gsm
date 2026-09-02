// Client-side cart storage. Deliberately holds only { productId, quantity }
// pairs — never a price/title/image snapshot — so the cart can never go
// stale; live product data is always re-fetched via /api/products/by-ids
// whenever the cart is displayed. No React here so this stays trivially
// unit-testable and reusable from CartContext.

export const CART_STORAGE_KEY = 'cart:v1';

export interface CartLine {
  productId: string;
  quantity: number;
}

function isCartLine(value: unknown): value is CartLine {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.productId === 'string' && v.productId.length > 0 && typeof v.quantity === 'number' && v.quantity > 0;
}

export function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Silently drop malformed/corrupted entries rather than throwing —
    // manually-edited or partially-written storage shouldn't break the cart.
    return parsed.filter(isCartLine);
  } catch {
    return [];
  }
}

export function writeCart(lines: CartLine[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(lines));
  } catch {
    // localStorage unavailable (private browsing, quota, etc.) — the cart
    // just won't persist across reloads for this session.
  }
}

// Adds `quantity` to an existing line for productId, or creates one —
// productId is always unique across the cart.
export function mergeAdd(lines: CartLine[], productId: string, quantity: number): CartLine[] {
  const existing = lines.find((l) => l.productId === productId);
  if (existing) {
    return lines.map((l) => (l.productId === productId ? { ...l, quantity: l.quantity + quantity } : l));
  }
  return [...lines, { productId, quantity }];
}

// Setting quantity to 0 (or below) removes the line entirely.
export function setLineQuantity(lines: CartLine[], productId: string, quantity: number): CartLine[] {
  if (quantity <= 0) return removeLine(lines, productId);
  return lines.map((l) => (l.productId === productId ? { ...l, quantity } : l));
}

export function removeLine(lines: CartLine[], productId: string): CartLine[] {
  return lines.filter((l) => l.productId !== productId);
}

export function totalQuantity(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

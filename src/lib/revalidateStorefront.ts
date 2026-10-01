import { revalidatePath } from 'next/cache';

// Home, /deals and /new-arrivals are ISR-cached (revalidate = 60, see those
// pages) for performance. Admin product writes should still show up
// immediately there instead of waiting out that window.
export function revalidateStorefront(): void {
  revalidatePath('/');
  revalidatePath('/deals');
  revalidatePath('/new-arrivals');
}

import { describe, expect, it } from 'vitest';
import { orderMessage, priceText } from './price';

describe('price', () => {
  it('shows a price, or asks when there is none', () => {
    expect(priceText(35000)).toBe('UGX 35,000');
    expect(priceText(0)).toBe('Ask for price');
  });
  it('never quotes UGX 0 on WhatsApp', () => {
    expect(orderMessage('Screen', 0)).not.toContain('UGX');
    expect(orderMessage('Screen', 5000)).toContain('UGX 5,000');
  });
});

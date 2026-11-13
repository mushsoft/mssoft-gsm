import { describe, it, expect } from 'vitest';
import { formatUsdCents, parseTopUpAmount, topUpUgx } from './walletAmounts';

describe('parseTopUpAmount', () => {
  it('accepts whole dollars and up to two decimals, as integer cents', () => {
    expect(parseTopUpAmount('20')).toEqual({ cents: 2000 });
    expect(parseTopUpAmount('12.5')).toEqual({ cents: 1250 });
    expect(parseTopUpAmount('12.29')).toEqual({ cents: 1229 }); // not 1228 from float noise
    expect(parseTopUpAmount(50)).toEqual({ cents: 5000 });
  });

  it('rejects junk, negative, too many decimals, and out-of-range amounts', () => {
    expect(parseTopUpAmount('abc').error).toBeDefined();
    expect(parseTopUpAmount('-5').error).toBeDefined();
    expect(parseTopUpAmount('1.234').error).toBeDefined();
    expect(parseTopUpAmount('').error).toBeDefined();
    expect(parseTopUpAmount('0.50').error).toMatch(/minimum/);
    expect(parseTopUpAmount('1000.01').error).toMatch(/maximum/);
    expect(parseTopUpAmount('1000')).toEqual({ cents: 100000 });
  });
});

describe('topUpUgx', () => {
  it('rounds up to the whole shilling so we never receive less than we credit', () => {
    // $20 at 4,214.67 = 84,293.4 → 84,294
    expect(topUpUgx(2000, 4214.67)).toBe(84294);
    expect(topUpUgx(100, 4215)).toBe(4215);
  });
});

describe('formatUsdCents', () => {
  it('formats positive and negative amounts', () => {
    expect(formatUsdCents(2050)).toBe('$20.50');
    expect(formatUsdCents(-799)).toBe('-$7.99');
    expect(formatUsdCents(0)).toBe('$0.00');
  });
});

import { describe, it, expect } from 'vitest';
import { parseCouponInput, CouponValidationError } from './validateCoupon';

describe('parseCouponInput', () => {
  it('accepts a valid fixed coupon', () => {
    const result = parseCouponInput({ code: 'save10', discountType: 'FIXED', value: 10000 });
    expect(result.code).toBe('SAVE10');
    expect(result.discountType).toBe('FIXED');
    expect(result.value).toBe(10000);
    expect(result.active).toBe(true);
    expect(result.maxUses).toBeNull();
  });

  it('rejects a percent discount over 100', () => {
    expect(() => parseCouponInput({ code: 'BIG', discountType: 'PERCENT', value: 150 })).toThrow(
      CouponValidationError
    );
  });

  it('accepts a percent discount of exactly 100', () => {
    expect(() => parseCouponInput({ code: 'FREE', discountType: 'PERCENT', value: 100 })).not.toThrow();
  });

  it('rejects a zero or negative value', () => {
    expect(() => parseCouponInput({ code: 'ZERO', discountType: 'FIXED', value: 0 })).toThrow(CouponValidationError);
    expect(() => parseCouponInput({ code: 'NEG', discountType: 'FIXED', value: -5 })).toThrow(CouponValidationError);
  });

  it('rejects an invalid discount type', () => {
    expect(() => parseCouponInput({ code: 'X', discountType: 'BOGUS', value: 10 })).toThrow(CouponValidationError);
  });

  it('rejects a code with invalid characters', () => {
    expect(() => parseCouponInput({ code: 'has space', discountType: 'FIXED', value: 10 })).toThrow(
      CouponValidationError
    );
  });

  it('rejects a non-positive maxUses', () => {
    expect(() => parseCouponInput({ code: 'X', discountType: 'FIXED', value: 10, maxUses: 0 })).toThrow(
      CouponValidationError
    );
  });

  it('accepts a null maxUses as unlimited', () => {
    const result = parseCouponInput({ code: 'X', discountType: 'FIXED', value: 10, maxUses: null });
    expect(result.maxUses).toBeNull();
  });
});

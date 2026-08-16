import { describe, it, expect } from 'vitest';
import { parseReviewInput, ReviewValidationError } from './validateReview';

describe('parseReviewInput', () => {
  it('accepts a valid review', () => {
    const result = parseReviewInput({ productId: 'p1', rating: 5, title: 'Great', body: 'Loved it' });
    expect(result).toEqual({ productId: 'p1', rating: 5, title: 'Great', body: 'Loved it' });
  });

  it('rejects a missing productId', () => {
    expect(() => parseReviewInput({ rating: 5, body: 'x' })).toThrow(ReviewValidationError);
  });

  it('rejects an out-of-range rating', () => {
    expect(() => parseReviewInput({ productId: 'p1', rating: 6, body: 'x' })).toThrow(ReviewValidationError);
    expect(() => parseReviewInput({ productId: 'p1', rating: 0, body: 'x' })).toThrow(ReviewValidationError);
  });

  it('rejects a non-integer rating', () => {
    expect(() => parseReviewInput({ productId: 'p1', rating: 4.5, body: 'x' })).toThrow(ReviewValidationError);
  });

  it('rejects an empty body', () => {
    expect(() => parseReviewInput({ productId: 'p1', rating: 5, body: '   ' })).toThrow(ReviewValidationError);
  });

  it('rejects a title over the max length', () => {
    expect(() =>
      parseReviewInput({ productId: 'p1', rating: 5, title: 'x'.repeat(151), body: 'ok' })
    ).toThrow(ReviewValidationError);
  });

  it('rejects a body over the max length', () => {
    expect(() =>
      parseReviewInput({ productId: 'p1', rating: 5, body: 'x'.repeat(3001) })
    ).toThrow(ReviewValidationError);
  });

  it('accepts a body right at the max length', () => {
    expect(() =>
      parseReviewInput({ productId: 'p1', rating: 5, body: 'x'.repeat(3000) })
    ).not.toThrow();
  });

  it('treats a blank title as null rather than an empty string', () => {
    const result = parseReviewInput({ productId: 'p1', rating: 5, title: '   ', body: 'ok' });
    expect(result.title).toBeNull();
  });
});

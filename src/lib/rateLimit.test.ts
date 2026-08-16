import { describe, it, expect } from 'vitest';
import { rateLimit } from './rateLimit';

describe('rateLimit', () => {
  it('allows requests up to the limit', () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 5; i++) {
      expect(rateLimit(key, 5, 60_000).allowed).toBe(true);
    }
  });

  it('blocks the request after the limit is reached', () => {
    const key = `test-${Math.random()}`;
    for (let i = 0; i < 3; i++) rateLimit(key, 3, 60_000);
    const result = rateLimit(key, 3, 60_000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfterSeconds).toBeGreaterThan(0);
  });

  it('tracks separate keys independently', () => {
    const keyA = `test-a-${Math.random()}`;
    const keyB = `test-b-${Math.random()}`;
    for (let i = 0; i < 3; i++) rateLimit(keyA, 3, 60_000);
    expect(rateLimit(keyA, 3, 60_000).allowed).toBe(false);
    expect(rateLimit(keyB, 3, 60_000).allowed).toBe(true);
  });

  it('resets after the window elapses', async () => {
    const key = `test-${Math.random()}`;
    expect(rateLimit(key, 1, 50).allowed).toBe(true);
    expect(rateLimit(key, 1, 50).allowed).toBe(false);
    await new Promise((resolve) => setTimeout(resolve, 60));
    expect(rateLimit(key, 1, 50).allowed).toBe(true);
  });
});

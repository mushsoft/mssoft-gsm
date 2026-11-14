import { describe, it, expect } from 'vitest';
import { isValidUsername, sanitizeUsernameInput } from './validation';

describe('sanitizeUsernameInput', () => {
  it('turns spaces into underscores and drops other symbols', () => {
    expect(sanitizeUsernameInput('Musa Kalungi')).toBe('Musa_Kalungi');
    expect(sanitizeUsernameInput('musa-k@gsm!')).toBe('musakgsm');
    expect(sanitizeUsernameInput('tech.guy_256')).toBe('tech.guy_256');
  });

  it('caps the length at 20', () => {
    expect(sanitizeUsernameInput('a'.repeat(30))).toHaveLength(20);
  });

  it('always produces something isValidUsername accepts once long enough', () => {
    for (const typed of ['Musa Kalungi', 'MS Soft GSM Uganda Ltd', 'john-doe 99', 'émile']) {
      const cleaned = sanitizeUsernameInput(typed);
      if (cleaned.length >= 3) expect(isValidUsername(cleaned)).toBe(true);
    }
  });
});

describe('isValidUsername', () => {
  it('enforces 3-20 letters, numbers, "_" or "."', () => {
    expect(isValidUsername('musa_k')).toBe(true);
    expect(isValidUsername('ab')).toBe(false);
    expect(isValidUsername('has space')).toBe(false);
    expect(isValidUsername('a'.repeat(21))).toBe(false);
  });
});

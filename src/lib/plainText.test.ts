import { describe, it, expect } from 'vitest';
import { replaceLongDashes, replaceLongDashesDeep } from './plainText';
import { parseProductInput } from './validateProduct';

describe('replaceLongDashes', () => {
  it('turns em dashes into commas and en dashes into "to"', () => {
    expect(replaceLongDashes('USB 3.2 — Windows / macOS')).toBe('USB 3.2, Windows / macOS');
    expect(replaceLongDashes('Universal—phones, tablets')).toBe('Universal, phones, tablets');
    expect(replaceLongDashes('~2.4"–2.8"')).toBe('~2.4" to 2.8"');
    expect(replaceLongDashes('Mon – Sat')).toBe('Mon to Sat');
  });

  it('leaves short hyphens alone', () => {
    expect(replaceLongDashes('CF-Tools - 1 Month Renew')).toBe('CF-Tools - 1 Month Renew');
  });
});

describe('replaceLongDashesDeep', () => {
  it('cleans every string inside nested specs', () => {
    expect(replaceLongDashesDeep({ size: '2.4"–2.8"', models: ['A — B'], count: 3, ok: true })).toEqual({
      size: '2.4" to 2.8"',
      models: ['A, B'],
      count: 3,
      ok: true,
    });
  });
});

describe('product save', () => {
  it('saves product text without long dashes', () => {
    const input = parseProductInput({
      title: 'Fold screen — inner',
      slug: 'fold-screen-inner',
      description: 'Fits Fold 3 – Fold 4',
      brand: 'Samsung',
      modelName: 'Z Fold 2 5G (F916) — inner display',
      category: 'SPARE_PART',
      subcategory: 'SCREEN',
      price: 350000,
      stock: 1,
      images: [],
      specs: { size: '7.6"–8"' },
    });
    expect(input.title).toBe('Fold screen, inner');
    expect(input.description).toBe('Fits Fold 3 to Fold 4');
    expect(input.modelName).toBe('Z Fold 2 5G (F916), inner display');
    expect(input.specs).toEqual({ size: '7.6" to 8"' });
  });
});
